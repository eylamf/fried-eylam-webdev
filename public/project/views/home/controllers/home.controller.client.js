/**
 * Created by eylamfried on 6/16/17.
 */

(function () {
    angular
        .module('PROJ')
        .controller('homeController', homeController);

    function homeController($location, $routeParams, yelpService) {

        var model = this;

        model.seachYelp = searchYelp;
        model.refresh = refresh;


        function init() {
            var location = chooseLocation();
            var term = chooseTerm();
            searchYelp(term, location);
        }
        init();

        function chooseLocation() {
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
            model.location = locations[Math.floor(Math.random() * locations.length)];
            return model.location;

        }

        function chooseTerm() {
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
            return model.term;

        }

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