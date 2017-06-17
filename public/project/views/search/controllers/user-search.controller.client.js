/**
 * Created by eylamfried on 6/16/17.
 */

(function () {

    angular
        .module('PROJ')
        .controller('userSearchController', userSearchController);

    function userSearchController($location, $routeParams, userService, yelpService) {
        var model = this;

        var userId = $routeParams['userId'];

        model.searchYelp = searchYelp;
        model.addBusiness = addBusiness;

        function init() {
            userService
                .findUserById(userId)
                .then(function (user) {
                     model.user = user;
                });
        }
        init();

        function searchYelp(term, city) {
            yelpService
                .searchYelp(term, city)
                .then(function (response) {
                    model.locations = response.data.businesses;
                });
        }

        function addBusiness(userId, business) {

            userService
                .addBusiness(userId, business)
                .then(function (response) {
                    console.log('this is the response : ' + response);
                });
        }
    }

})();