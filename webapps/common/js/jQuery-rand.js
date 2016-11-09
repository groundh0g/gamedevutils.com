// http://stackoverflow.com/a/5915285

(function($) {
    $.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;  // chosen by fair dice roll
        }
    };

    $.escapeRegExp = function(arg) {
        return arg.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
})(jQuery);