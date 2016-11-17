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

$(document).ready(function(){
    "use strict";

    if(widgets) {
        for(var i = 0; i < widgets.length; i++) {
            widgets[i]();
        }
    }

    alert("NOTE: This is a sneak peek. You can kick the tires, but you cannot save your work.");

    $("#cmdFileNew").addClass("disabled");
    $("#cmdFileOpen").addClass("disabled");
    $("#cmdFileSave").addClass("disabled");

    $('#popupFontSelect').on('shown.bs.modal', function() { $("#txtFontSearch").focus(); });
    $("#cmdFontAdd").click(function() {
        $("#popupFontSelect").modal("show");
        return false;
    });

    $("#cmdFontRemove").addClass("disabled");
    $("#cmdRefresh").addClass("disabled");
    $("#cmdPublish").addClass("disabled");

    $("#cmdToggleSettings").click(function(){
        if($("#divSidebarLeft").is(':visible')) {
            $("#divSidebarLeft").hide();
            $("#divWorkspace").css("left","0px");
            $("#divWorkspaceToolbar").css("left","0px");
            $("#progressBarWrapper").css("width","400px");
            $("#cmdToggleSettings").removeClass("active").blur();
        } else {
            $("#divSidebarLeft").show();
            $("#progressBarWrapper").css("width","200px");
            $("#divWorkspace").css("left","200px");
            $("#divWorkspaceToolbar").css("left","200px");
            $("#cmdToggleSettings").addClass("active").blur();
        }
        return false;
    });

    $("#radioRightNav button").click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        if($(this).attr("id") === "tabFonts") {
            $("#divConsole").hide();
            $("#divFontsList").show();
        } else {
            $("#divFontsList").hide();
            $("#divConsole").show();
        }
        $(this).blur();
        return false;
    });
});
