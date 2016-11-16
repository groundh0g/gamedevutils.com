$(document).ready(function(){
    "use strict";

    $("#cmdFontToggleDark").click(function () {
        var $div = $("#divFontListItems");
        if($div.hasClass("dark-items")) {
            $div.removeClass("dark-items");
        } else {
            $div.addClass("dark-items");
        }
    });
});
