/**
 * Created by eylamfried on 5/27/17.
 */

(function() {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {
        // this is instead of using $scope
        var model = this;

        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);

    };

})();