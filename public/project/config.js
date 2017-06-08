/**
 * Created by eylamfried on 5/28/17.
 */

(function() {
    angular
        .module('PROJ') // only reading the module
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/search', {
                templateUrl: 'views/templates/search.view.client.html',
                controller: 'yelpController',
                controllerAs: 'model'
            });


    }

})();