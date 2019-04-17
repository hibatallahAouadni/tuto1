angular.module("MyFilters", [])
.filter("highlightingSearch", function() {
    return function(input, query) {
        if(query) {
            return input.replace(new RegExp("(" + query + ")", "gi"), "<span class='highlightingSearch'>$1</span>");
        }
        return input;
    }
});