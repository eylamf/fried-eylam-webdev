/**
 * Created by eylamfried on 6/16/17.
 */

(function () {
    angular
        .module('PROJ')
        .controller('homeController', homeController);

    function homeController($location, $routeParams) {

        var model = this;

        model.userId = $routeParams['userId'];

        console.log("this is model userId: " + model.userId);

    }

})();