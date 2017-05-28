/**
 * Created by eylamfried on 5/27/17.
 */

(function() {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams, websiteService) {
        // this is instead of using $scope
        var model = this;

        // event handlers
        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        // this needs to execute at startup
        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();

        // implementations
        function createWebsite(website) {
            websiteService.createWebsite(website);
        }

    };

})();