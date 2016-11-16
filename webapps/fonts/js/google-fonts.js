var GoogleFonts = new (function() {
    "use strict";

    var self = this;
    var loadedFonts = [];
    var API_URL = "https://www.googleapis.com/webfonts/v1/webfonts";
    var API_KEY = "AIzaSyBVL2DKsa-WO98qUPG65DxTy5xTNEy9NW0";

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

    this.LoadFontList = function(callback) {
        $.get(API_URL + "?key=" + API_KEY + "&sort=popularity", function( data ) {
            var familyCount = (data && data.items) ? data.items.length : 0;
            var fontCount = 0;

            if(data && data.items && data.items.length) {
                for(var i = 0; i < data.items.length; i++) {
                    fontCount += (data.items[i].variants || []).length;
                }
            }

            Console.info("Loaded " + fontCount + " font(s) in " + familyCount + " families.");
            self.FontList = data;
            for(var i = 0; i < self.FontList.items.length; i++) {
                self.FontList.items[i].popularity = i;
            }
            // console.log(data);
            // alert( "Load was performed." );
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
    });
});

/*
 <script>
 WebFont.load({
 google: {
 families: ['Droid Sans', 'Droid Serif']
 }
 });
 </script>
 */