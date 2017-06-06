/**
 * Created by eylamfried on 5/27/17.
 */

(function() {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
        // this is instead of using $scope
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        // event handlers
        //model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

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
        }
        init();

        // implementations
        /*function createWebsite(website) {
            website.developerId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/' + model.userId + '/website');
        }*/


        function updateWebsite(websiteId, website) {
            websiteService
                .updateWebsite(websiteId, website)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website');
                });
            // websiteService.updateWebsite();
            // $location.url('/user/' + model.userId + '/website');
        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website');
                });
            // websiteService.deleteWebsite(websiteId);
            // $location.url('/user/' + model.userId + '/website');
        }

    };

})();