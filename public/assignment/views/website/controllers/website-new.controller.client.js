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

            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });

            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (website) {
                    model.website = website;
                });


            //model.websites = websiteService.findAllWebsitesForUser(model.userId);
            //model.website = websiteService.findWebsiteById(model.websiteId);

        }
        init();

        // implementations
        function createWebsite(userId, website) {
            websiteService
                .createWebsite(userId, website)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website');
                });
            // website.developerId = model.userId;
            // websiteService.createWebsite(website);
            // $location.url('/user/' + model.userId + '/website');
        }

    };

})();