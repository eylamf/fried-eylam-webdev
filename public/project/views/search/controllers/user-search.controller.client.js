/**
 * Created by eylamfried on 6/16/17.
 */

(function () {

    angular
        .module('PROJ')
        .controller('userSearchController', userSearchController);

    function userSearchController(currentUser, userService, $location, yelpService, businessService) {
        var model = this;


        model.searchYelp = searchYelp;
        model.setTerm = setTerm;
        model.setPrice = setPrice;
        model.createBusiness = createBusiness;
        model.addBusiness = addBusiness;
        model.removeBusiness = removeBusiness;


        function init() {
            model.currentUser = currentUser;
        }
        init();

        function setPrice(price) {

            if (price === "1") {
                model.priceInCash = '$';
            } else if (price === "2") {
                model.priceInCash = '$$';
            } else if (price === '3') {
                model.priceInCash = '$$$';
            } else if (price === '4') {
                model.priceInCash = '$$$$';
            } else if (price === '0') {
                model.priceInCash = null;
            }

            model.price = price;

        }

        function createBusiness(userId, business) {
            businessService
                .createBusiness(userId, business)
                .then(function (response) {
                    model.red = "lightRed";
                });
        }


        function setTerm(term) {
            model.term = term;
        }

        function searchYelp(term, location) {

            if (location === null || typeof location === 'undefined') {
                model.error = "Please enter a valid city";
                return;
            }

            if (term === null || typeof term === 'undefined') {
                term = " ";
            }

            model.error = null;

            var city = location.charAt(0).toUpperCase();
            model.location = city + location.slice(1);

            yelpService
                .searchYelp(term, location)
                .then(function (response) {
                    model.businesses = response.data.businesses;
                });
        }

        function removeBusiness(userId, businessId) {
            userService
                .removeBusiness(userId, businessId)
                .then(function (response) {
                });
        }

        function addBusiness(userId, businessId) {

            userService
                .addBusiness(userId, businessId)
                .then(function (response) {
                    init();
                });
        }
    }

})();