/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);


    function pageListController($routeParams, pageService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        // this needs to execute at startup
        function init() {

            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });


        }
        init();

    };



})();