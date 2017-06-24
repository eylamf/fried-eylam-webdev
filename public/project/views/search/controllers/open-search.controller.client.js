/**
 * Created by eylamfried on 6/16/17.
 */

(function () {

    angular
        .module('PROJ')
        .controller('openSearchController', openSearchController);

    function openSearchController(yelpService) {
        var model = this;

        model.searchYelp = searchYelp;
        model.setTerm = setTerm;

        function init() {

        }
        init();

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

    }

})();