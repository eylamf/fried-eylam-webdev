/**
 * Created by eylamfried on 5/27/17.
 */

(function() {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {
        // this is instead of using $scope
        var model = this;

        // event handlers
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createWebsite = createWebsite;

        // this needs to execute at startup
        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);

        }
        init();

        // implementations
        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/' + model.userId + '/website');
        }

    };

})();