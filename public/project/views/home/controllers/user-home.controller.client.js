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

        model.seeDetails = seeDetails;
        model.cancelDetails = cancelDetails;

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

            model.friendsBusinesses = [];

            userService
                .findAllFriendsForUser(currentUser._id)
                .then(function (friends) {
                    model.friends = friends;
                    console.log(friends);
                    friends = friends.sort();
                    console.log(friends);

                    var newFriend = [];
                    //newFriend.push(friends[0]);
                    for (var i = 0; i < friends.length; i++) {
                        newFriend.push(friends[i]);
                    }

                    var counter = 0;
                    for (var u in newFriend) {

                        businessService
                            .findAllBusinessesForUser(newFriend[u]._id)
                            .then(function (businesses) {
                                var obj = {
                                    user: newFriend[counter].username,
                                    items: businesses
                                };
                                counter++;
                                model.friendsBusinesses.push(obj);
                            }, function (err) {
                                console.log(err);
                            });
                    }
                    for (var j = 0; j < model.friendsBusinesses.length; j++) {
                        model.friendsBusinesses[j].user = friends[j].username;
                    }

                });


        }
        init();

        function refresh() {
            init();
        }

        function cancelDetails() {
            model.selectedBusiness = null;
            model.message = null;
        }

        function seeDetails(business) {
            model.selectedBusiness = business;
            model.comments = business._comments;
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