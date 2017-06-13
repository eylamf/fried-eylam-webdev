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
        var accessToken = 'Authorization=Bearer f9v0cXyTOKnqPqew1gDFZdnI1JVtFxQKj8cEJwgp0sTI_X9RH6dqTi1pYzcPQhqq9DgexghKfOT08QH3I2GbC1Z7WTU5DcGN2NDwlBNzoo5PmCtuT_fjqr05NqQ4WXYx';

        function searchYelp(term, city) {
            var cityName = city.replace(/\s+/g, '');
            var correctTerm = term.replace(/\s+/g, '');
            var url = '/api/project/index.html/search?term=' + correctTerm.toLowerCase() + '&location=' + cityName.toLowerCase();
            return $http.get(url);
        }


    }

})();

