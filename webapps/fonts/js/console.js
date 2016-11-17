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

var Console = new (function() {
    "use strict";

    // constants
    this.LOG_DEBUG = "DEBUG";
    this.LOG_ERROR = "ERROR";
    this.LOG_INFO = "INFO";
    this.LOG_WARN = "WARN";

    // ** DEBUG MODE **
    this.isDebug = true;

    var self = this;
    var logEntries = [];
    var logCounts = { };

    var _entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    var escapeHtml = function(string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return _entityMap[s];
        });
    };

    var log = function(type, msg, ex) {
        logCounts[type] = (logCounts[type] || 0) + 1;
        logEntries.push({
            type: type,
            message: msg,
            exception: ex
        });

        var icon = undefined;
        switch(type) {
            case self.LOG_DEBUG: icon = "fa fa-angle-double-right"; break;
            case self.LOG_ERROR: icon = "fa fa-bug"; break;
            case self.LOG_INFO:  icon = "fa fa-info-circle"; break;
            case self.LOG_WARN:  icon = "fa fa-exclamation-triangle"; break;
        }
        var html =
            (icon ? "<i class='" + icon + "'></i> " : "") +
            (type ? "<b>" + type + ":</b> " : "") +
            msg;
        if(ex) {
            html = "<span title='" + escapeHtml(ex) + "' style='cursor:default;'>" + html + "</span>";
        } else {
            html = "<span style='cursor:default;'>" + html + "</span>";
        }
        $("#divConsole").append(html).append("<br/>");

        $("#tabConsole span").hide();
        var $lbl = undefined;
        switch(type) {
            case self.LOG_ERROR: $lbl = $("#lblLogCountERROR"); break;
            case self.LOG_DEBUG: $lbl = $("#lblLogCountDEBUG"); break;
            case self.LOG_WARN:  $lbl = $("#lblLogCountWARNING"); break;
            case self.LOG_INFO:  $lbl = $("#lblLogCountINFO"); break;
            default: $lbl = $("#lblLogCountSUCCESS"); break;
        }
        $lbl.text(self.count()).show();
    };

    this.debug = function(msg, ex) { if(this.isDebug) log(this.LOG_DEBUG, msg, ex); };
    this.error = function(msg, ex) { log(this.LOG_ERROR, msg, ex); };
    this.info  = function(msg, ex) { log(this.LOG_INFO,  msg, ex); };
    this.warn  = function(msg, ex) { log(this.LOG_WARN,  msg, ex); };

    this.clear = function() {
        logEntries = [];
        logCounts = { };
        $("#divConsole").html("");
    };

    this.count = function(type) {
        return type ? (logCounts[type] || 0) : (
            (logCounts[this.LOG_DEBUG] || 0) +
            (logCounts[this.LOG_ERROR] || 0) +
            (logCounts[this.LOG_INFO]  || 0) +
            (logCounts[this.LOG_WARN]  || 0)
        );
    };

    this.clear();

    return this;
})();