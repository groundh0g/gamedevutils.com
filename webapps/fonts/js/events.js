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
