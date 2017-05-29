/**
 * Created by eylamfried on 5/27/17.
 */

(function() {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {
        // this is instead of using $scope
        var model = this;

        // retrieve websites for this user
        model.userId = $routeParams['userId'];



        // this needs to execute at startup
        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);

        }
        init();

    };

})();