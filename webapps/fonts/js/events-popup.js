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

var fontFilters = {
    txtFontSearch: "",
    ddlFontCategory: "All",
    ddlFontSuggestions: "All",
    ddlFontSubsets: "All"
};

var resizeFontPreview;
var updateFontPreviewText;
var searchFonts;

$(document).ready(function(){
    "use strict";

    var SHOW_ALL_FONTS = 99999;

    widgetListeners.push(function(name, val){
        switch(name) {
            case "ddlFontCategory":
            case "ddlFontSuggestions":
            case "ddlFontSubset":
                fontFilters[name] = val;
                refreshFontList(val !== "All" ? SHOW_ALL_FONTS : undefined);
                break;
            case "ddlFontSortBy":
                if($("#" + name).val() !== val) {
                    GoogleFonts.SortFontList(val);
                    refreshFontList(suppressLoadOnScroll ? SHOW_ALL_FONTS : undefined);
                }
                break;
        }
    });

    searchFonts = function(text) {
        var val = $("#txtFontSearch").val();
        if(text === undefined) {
            text = val;
        }

        $("#txtFontSearch").val(text);
        fontFilters.txtFontSearch = text;
        refreshFontList(text.length > 0 ? SHOW_ALL_FONTS : undefined);
    };

    $("#cmdFontToggleDark").click(function () {
        var $div = $("#divFontListItems");
        if($div.hasClass("dark-items")) {
            $div.removeClass("dark-items");
        } else {
            $div.addClass("dark-items");
        }
    });

    resizeFontPreview = function(size) {
        var $txtFontSize = $("#txtFontSize");
        size = size || $txtFontSize.val() || 30;
        if(!$.isNumeric(size)) {
            size = 30;
        }

        if(size != $txtFontSize.val()) {
            $txtFontSize.val(size);
        }

        fontListItemHeight = fontListItemHeight || $("div.fontListItem").first().outerHeight();
        $("#divFontListItems .fontListItem .fontListItemText").css("font-size", size + "pt");
    };

    updateFontPreviewText = function(text) {
        var $txtFontPreviewText = $("#txtFontPreviewText");
        text = text || $txtFontPreviewText.val() || "The quick brown fox jumped over the lazy dog.";
        if(text !== $txtFontPreviewText.val()) {
            $txtFontPreviewText.val(text);
        }
        $("#divFontListItems .fontListItem .fontListItemText").text(text);
    };

    var refreshFontList = function(count, start){
        clearFontListItems();
        suppressLoadOnScroll = (count === SHOW_ALL_FONTS);
        setTimeout(function(){ createFontListItems(count, start); }, 0);
    };

    $("#cmdFontResetOptions").click(function () {
        $("#ddlFontCategory").text("All");
        $("#ddlFontSuggestions").text("All");
        $("#ddlFontSubset").text("Latin");
        if($("#ddlFontSortBy").text() !== "popularity") {
            $("#ddlFontSortBy").text("popularity");
            GoogleFonts.SortFontList("popularity");
        }

        fontFilters = {
            txtFontSearch: "",
            ddlFontCategory: "All",
            ddlFontSuggestions: "All",
            ddlFontSubsets: "Latin"
        };

        updateFontPreviewText("The quick brown fox jumped over the lazy dog.");
        resizeFontPreview(30);
        searchFonts("");
    });

    $("#cmdFontRefresh").click(function(){
        refreshFontList();
    });
});
