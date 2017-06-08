/**
 * Created by eylamfried on 5/28/17.
 */
/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('PROJ')
        .service('yelpService', yelpService);

    function yelpService($http) {

        this.searchYelp = searchYelp;

        var key = "be63fb748c0ce5677af6163e431ee392";
        var secret = "cc0ab29a7833ae51";
        var urlBase = "https://api.yelp.com/oauth2/token";

        function searchYelp(term) {
            var url = '/api/project/index.html/search';
            return $http.get(url);
        }


    }

})();

