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

fontFilters = {
    txtFontSearch: "",
    ddlFontCategory: "All",
    ddlFontSuggestions: "All",
    ddlFontSubsets: "All"
};

$(document).ready(function(){
    "use strict";

    var refreshFontList = function(count){
        clearFontListItems();
        setTimeout(function(){
            var showAllFontsAtOnce = false;
            showAllFontsAtOnce |= (fontFilters.txtFontSearch !== "");
            showAllFontsAtOnce |= (fontFilters.ddlFontCategory !== "All");
            showAllFontsAtOnce |= (fontFilters.ddlFontSuggestions !== "All");
            showAllFontsAtOnce |= (fontFilters.ddlFontSubsets !== "All");
            createFontListItems(count || (showAllFontsAtOnce ? 99999 : 10));
        }, 0);
    };

    widgetListeners.push(function(name, val){
        switch(name) {
            case "ddlFontCategory":
            case "ddlFontSuggestions":
            case "ddlFontSubset":
                fontFilters[name] = val;
                refreshFontList();
                break;
            case "ddlFontSortBy":
                if($("#" + name).val() !== val) {
                    GoogleFonts.SortFontList(val);
                    refreshFontList();
                }
                break;
        }
    });

    $("txtFontSearch").keypress(function(e){
        if(e.which === 13) {
            fontFilters.txtFontSearch = $(this).val();
            refreshFontList();
        }
    });

    $("#cmdFontToggleDark").click(function () {
        var $div = $("#divFontListItems");
        if($div.hasClass("dark-items")) {
            $div.removeClass("dark-items");
        } else {
            $div.addClass("dark-items");
        }
    });

    $("#cmdFontResetOptions").click(function () {
        $("#ddlFontCategory").text("All");
        $("#ddlFontSuggestions").text("All");
        $("#ddlFontSubset").text("Latin");
        if($("#ddlFontSortBy").text() !== "popularity") {
            $("#ddlFontSortBy").text("popularity");
            GoogleFonts.SortFontList("popularity");
        }
        $("#txtFontSearch").val("");
        refreshFontList();
    });

    $("#cmdFontRefresh").click(function(){
        refreshFontList();
    });
});
