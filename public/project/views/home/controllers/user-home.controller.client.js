/**
 * Created by eylamfried on 6/22/17.
 */

(function () {
    angular
        .module('PROJ')
        .controller('userHomeController', userHomeController);

    function userHomeController(currentUser, yelpService, businessService, $location, userService) {
        var model = this;


        model.searchYelp = searchYelp;
        model.refresh = refresh;
        model.createBusiness = createBusiness;
        model.removeBusiness = removeBusiness;

        function init() {
            model.currentUser = currentUser;

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
                typeof model.currentUser.favCity === 'undefined' || model.currentUser.favCity === '') {
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

        function removeBusiness(userId, business) {
            userService
                .removeBusiness(userId, business)
                .then(function (response) {

                });

        }

        function createBusiness(userId, business) {
            businessService
                .createBusiness(userId, business)
                .then(function (response) {
                    $location.url('/user-home');
                });
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