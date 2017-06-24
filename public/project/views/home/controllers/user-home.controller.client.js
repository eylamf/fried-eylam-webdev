/**
 * Created by eylamfried on 6/22/17.
 */

(function () {
    angular
        .module('PROJ')
        .controller('userHomeController', userHomeController);

    function userHomeController(currentUser, yelpService) {
        var model = this;
        model.currentUser = currentUser;

        model.searchYelp = searchYelp;
        model.refresh = refresh;

        function init() {

            var locations = [
                "New York",
                "Boston",
                "San Diego",
                "Los Angeles",
                "Austin",
                "San Francisco",
                "Philadelphia",
                "Chicago",
                "Dallas",
                "Phoenix",
                "San Antonio"
            ];

            if (model.currentUser.favCity === null ||
                typeof model.currentUser.favCity === 'undefined') {
                model.location = locations[Math.floor(Math.random() * locations.length)];
            } else {
                model.location = model.currentUser.favCity;
            }

            var terms = [
                "Bars",
                "Food",
                "Sports",
                "Restaurants",
                "Nightlife",
                "Sandwiches",
                "Italian",
                "Pizza",
                "Chinese",
                "Seafood",
                "Japanese",
                "Sushi Bars",
                "Mexican",
                "Pubs",
                "Burgers",
                "Salad",
                "Steakhouses",
                "Sports Bars",
                "Music Venues",
                "Asian Fusion",
                "Wine Bars",
                "Dance Clubs",
                "Dive Bars",
                "Lounges",
                "Breakfast & Brunch"
            ];

            model.term = terms[Math.floor(Math.random() * terms.length)];

            var city = model.location;
            var term = model.term;

            searchYelp(term, city);
        }
        init();

        function refresh() {
            init();
        }

        function searchYelp(term, location) {
            yelpService
                .searchYelp(term, location)
                .then(function (response) {
                    model.suggestions = response.data.businesses;
                });
        }
    }
})();