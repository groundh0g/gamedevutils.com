/*
 Copyright (c) 2016 Joseph B. Hall [@groundh0g]

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

var GoogleFonts = new (function() {
    "use strict";

    var self = this;
    var API_URL = "https://www.googleapis.com/webfonts/v1/webfonts";
    var API_KEY = "AIzaSyBVL2DKsa-WO98qUPG65DxTy5xTNEy9NW0";

    // FIXME: From FontCDN.org ... I'd rather not have this hard-coded.
    this.Suggestions = {
        Paragraphs: ['Alegreya', 'Asap', 'Average', 'Cabin', 'Cardo', 'Crete Round', 'Crimson Text', 'Domine', 'Droid Sans', 'Droid Serif', 'Exo', 'Gentium Book Basic', 'Josefin Slab', 'Kreon', 'Lora', 'Libre Baskerville', 'Merriweather', 'Neuton', 'Noticia Text', 'Old Standard TT', 'Open Sans', 'Poly', 'PT Sans', 'PT Serif', 'Roboto', 'Source Sans Pro', 'Ubuntu', 'Varela', 'Vollkorn', 'Work Sans'],
        Headings: ['Abel', 'Arvo', 'Bitter', 'Bree Serif', 'Cabin', 'Droid Sans', 'Droid Serif', 'Gudea', 'Istok Web', 'Lato', 'Lobster', 'Merriweather', 'Montserrat', 'Muli', 'Nunito', 'Open Sans', 'Oswald', 'Pacifico', 'Playfair Display', 'PT Sans', 'PT Serif', 'Quicksand', 'Raleway', 'Roboto', 'Roboto Slab', 'Rokkitt', 'Ubuntu', 'Varela', 'Vollkorn', 'Work Sans']
    };


    this.FontList = {};

    this.SortFontList = function(sortBy) {
        var items = self.FontList.items;

        if(!items || items.length < 1) {
            Console.debug("Attempt to sort empty font list.");
        } else if(items[0][sortBy] === undefined) {
            Console.debug("Attempt to sort font list by unknown field.", sortBy);
        } else {
            items.sort(function(a,b){
                return ((a[sortBy] < b[sortBy]) ? -1 : ((a[sortBy] > b[sortBy]) ? 1 : 0));
            });
        }
    };

    this.GetFont = function(name) {
        for(var i = 0; i < self.FontList.items.length; i++) {
            var item = self.FontList.items[i];
            if(item.family === name) {
                return item;
            }
        }
        return undefined;
    };

    this.LoadFontList = function(callback) {
        $.get(API_URL + "?key=" + API_KEY + "&sort=popularity", function( data ) {
            var familyCount = (data && data.items) ? data.items.length : 0;
            var fontCount = 0;

            var isPositiveInteger = function(n) {
                return n >>> 0 === parseFloat(n);
            }

            self.FontList = data;

            for(var i = 0; i < self.FontList.items.length; i++) {
                var item = self.FontList.items[i];
                fontCount += (item.variants || []).length;
                item.popularity = i;
                item.loaded = false;
                if(item.files["regular"]) {
                    item.defaultStyle = "regular";
                } else {
                    for(var v = 0; v < item.variants.length; v++) {
                        if(isPositiveInteger(item.variants[v])) {
                            item.defaultStyle = item.variants[v];
                            break;
                        }
                    }
                    if(!item.defaultStyle) {
                        if(isPositiveInteger(item.variants[0][0])) {
                            item.defaultStyle =
                                item.variants[0][3] +
                                item.variants[0][0];
                        } else {
                            item.defaultStyle =
                                item.variants[0][0] + "4";
                        }
                    }
                }
            }

            Console.info("Loaded " + fontCount + " font(s) in " + familyCount + " families.");

            if(callback) { callback(); }
        }).fail(function(data){
            var ex = undefined;
            if(data && data.responseJSON && data.responseJSON.error && data.responseJSON.error.message) {
                ex = data.responseJSON.error.message;
            } else {
                ex = data.statusText || data.statusCode;
            }
            Console.error("Error loading font list.", ex);
        });
    };

    this.ClassNameForFontName = function(name) {
        return "font-" + name.replace(/ /g, "").toLowerCase();
    };

    this.DecodeFvd = function(fvd) {
        fvd = fvd || "n4";

        var result = {
            "fvd": fvd,
            "font-style": "normal",
            "font-weight-numeric": "400",
            "font-weight": "400"
        };

        switch(fvd[0]) {
            case 'i':
                result["font-style"] = "italic"; break;
            case 'o':
                result["font-style"] = "oblique"; break;
            case 'n':
                result["font-style"] = "normal"; break;
        }

        if(fvd.length > 1) {
            switch (fvd[1]) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    result["font-weight-numeric"] = fvd[1] + "00";
                    break;
            }
        }

        switch(result["font-weight-numeric"]) {
            case "400":
                result["font-weight"] = "normal";
                break;
            case "700":
                result["font-weight"] = "bold";
                break;
            default:
                result["font-weight"] = result["font-weight-numeric"];
                break;
        }

        return result;
    };

    this.LoadFont = function(font, onlyDefault) {
        var fonts = [];
        fonts.push(
            font.family +
            ':' + font.variants.join(',') +
            ':' + font.subsets.join(',')
        );

        WebFont.load({
            google: {
                families: fonts
            },
            fontloading: function(familyName, fvd) {  },
            fontactive: function(familyName, fvd) {
                var item = self.GetFont(familyName);
                item.loaded = true;
                $("#divFontListItems").find("." + GoogleFonts.ClassNameForFontName(familyName))
                    .removeClass("not-loaded");
            },
            fontinactive: function(familyName, fvd) {
                Console.debug(familyName + " " + fvd + " is inactive");
            }
        });
    };

    return this;
})();

$(document).ready(function(){
    "use strict";

    GoogleFonts.LoadFontList(function(){
        $('#txtFontSearch').typeahead({
            source: GoogleFonts.FontList.items,
            displayText: function(item) { return item.family; },
            autoSelect: true
        });

        clearFontListItems();
        createFontListItems();

    });

    var fontListItemHeight = 0;
    var fontListDivHeight = 0;
    $("#divPopupFontList").scroll(function() {
        var $fontListItems = $("div.fontListItem");
        var fontListItemCount = $fontListItems.length;
        fontListItemHeight = fontListItemHeight || $fontListItems.first().outerHeight();
        fontListDivHeight = fontListDivHeight || $(this).height();
        var scrollTop = $(this).scrollTop();

        if(fontListItemHeight * fontListItemCount - scrollTop < fontListDivHeight) {
            createFontListItems(10, fontListItemCount);
        }
    });
});