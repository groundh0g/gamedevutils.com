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

import ConsoleTab from '../../widgets/ConsoleTab';
import WebFont from 'webfontloader';
import $ from 'jquery';

export class GoogleFonts {
    static API_URL = "https://www.googleapis.com/webfonts/v1/webfonts";
    static API_KEY = "AIzaSyBVL2DKsa-WO98qUPG65DxTy5xTNEy9NW0";

    // FIXME: From FontCDN.org ... I'd rather not have this hard-coded.
    static Suggestions = {
        Paragraphs: ['Alegreya', 'Asap', 'Average', 'Cabin', 'Cardo', 'Crete Round', 'Crimson Text', 'Domine', 'Droid Sans', 'Droid Serif', 'Exo', 'Gentium Book Basic', 'Josefin Slab', 'Kreon', 'Lora', 'Libre Baskerville', 'Merriweather', 'Neuton', 'Noticia Text', 'Old Standard TT', 'Open Sans', 'Poly', 'PT Sans', 'PT Serif', 'Roboto', 'Source Sans Pro', 'Ubuntu', 'Varela', 'Vollkorn', 'Work Sans'],
        Headings: ['Abel', 'Arvo', 'Bitter', 'Bree Serif', 'Cabin', 'Droid Sans', 'Droid Serif', 'Gudea', 'Istok Web', 'Lato', 'Lobster', 'Merriweather', 'Montserrat', 'Muli', 'Nunito', 'Open Sans', 'Oswald', 'Pacifico', 'Playfair Display', 'PT Sans', 'PT Serif', 'Quicksand', 'Raleway', 'Roboto', 'Roboto Slab', 'Rokkitt', 'Ubuntu', 'Varela', 'Vollkorn', 'Work Sans']
    };

    static FontList = { };

    static SortFontList(sortBy) {
        let items = GoogleFonts.FontList.items;

        if(!items || items.length < 1) {
            ConsoleTab.debug("Attempt to sort empty font list.");
        } else if(items[0][sortBy] === undefined) {
            ConsoleTab.debug("Attempt to sort font list by unknown field ['" + sortBy + "'].");
        } else {
            items.sort(function(a,b){
                return ((a[sortBy] < b[sortBy]) ? -1 : ((a[sortBy] > b[sortBy]) ? 1 : 0));
            });
        }
    }

    static GetFont(name) {
        let items = GoogleFonts.FontList.items;

        for(let i = 0; i < items.length; i++) {
            if(items[i].family === name) {
                return items[i];
            }
        }
    }

    /** @return string */
    static ClassNameForFontName(name) {
        return "font-" + name.replace(/ /g, "").toLowerCase();
    }

    static DecodeFvd(fvd) {
        fvd = fvd || "n4";

        let result = {
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
            /* istanbul ignore next */
            default:
                break;
        }

        /* istanbul ignore else */
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
                /* istanbul ignore next */
                default:
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
    }

    static LoadFontList(callback) {
        ConsoleTab.info("Retrieving font list ...");
        let info = ConsoleTab.info;
        $.get(GoogleFonts.API_URL + "?key=" + GoogleFonts.API_KEY + "&sort=popularity", (data) => {
            let familyCount = (data && data.items) ? data.items.length : 0;
            let fontCount = 0;

            let isPositiveInteger = function(n) {
                return n >>> 0 === parseFloat(n);
            };

            GoogleFonts.FontList = data;

            let items = GoogleFonts.FontList.items;
            for(let i = 0; i < items.length; i++) {
                let item = items[i];
                let variants = item.variants || [];
                fontCount += variants.length;
                item.popularity = i;
                item.loaded = false;
                if(item.files["regular"]) {
                    item.defaultStyle = "regular";
                } else {
                    for(let v = 0; v < variants.length; v++) {
                        if(isPositiveInteger(variants[v])) {
                            item.defaultStyle = variants[v];
                            break;
                        }
                    }
                    if (!item.defaultStyle && variants.length) {
                        if (isPositiveInteger(variants[0][0])) {
                            item.defaultStyle =
                                variants[0][3] +
                                variants[0][0];
                        } else {
                            item.defaultStyle =
                                variants[0][0] + "4";
                        }
                    }
                }
            }

            info("Loaded " + fontCount + " font(s) in " + familyCount + " families.");

            /* istanbul ignore else */
            if(callback) { callback(); }
        }).fail(GoogleFonts.LoadFontListFail);
    }

    // TODO: extracted method for tests only. can't get $.get().fail to trigger with responseJSON, but it's expected? revisit.
    static LoadFontListFail(data) {
        let ex = undefined;
        if(data && data.responseJSON && data.responseJSON.error && data.responseJSON.error.message) {
            ex = data.responseJSON.error.message;
        } else {
            ex = data.statusText || data.statusCode;
        }
        ConsoleTab.error("Error loading font list.", ex);
    }

    static LoadFont(font, onlyDefault) {
        let fonts = [];
        fonts.push(
            font.family +
            ':' + font.variants.join(',') +
            ':' + font.subsets.join(',')
        );

        WebFont.load({
            google: {
                families: fonts
            },
            fontloading: (familyName, fvd) => {  },
            fontactive: (familyName, fvd) => {
                let item = GoogleFonts.GetFont(familyName);
                item.loaded = true;
                // TODO: make more generic, maybe a callback for the callback? :P
                $("#divFontListItems").find("." + GoogleFonts.ClassNameForFontName(familyName))
                    .removeClass("not-loaded");
            },
            fontinactive: (familyName, fvd) => {
                ConsoleTab.debug(familyName + " " + fvd + " is inactive");
            }
        });
    };
}
