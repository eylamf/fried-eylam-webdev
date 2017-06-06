/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($sce, $routeParams, widgetService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];



        // this needs to execute at startup
        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });

            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                    model.widgetCopy = angular.copy(model.widget);
                });

        }
        init();


        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        model.createWidget = createWidget;


        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(youtubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            // split at '/' to get the video id (last segment)
            var linkParts = youtubeLink.split('/');
            var id = linkParts[linkParts.length - 1];
            embedUrl += id;
            // must use $sce for trust issue
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function createWidget(pageId, widget) {
            widgetService
                .createWidget(pageId, widget)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +
                        model.pageId + '/widget');
                });
            /*
            widgetService.createWidget(pageId, widgetType);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +
                model.pageId + '/widget');
            */

        }

        function updateWidget(widgetId, widget) {
            widgetService
                .updateWidget(widgetId, widget)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +
                        model.pageId + '/widget');
                });

            /*
            widgetService.updateWidget(widgetId, widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +
                model.pageId + '/widget');
                */
        }

        function deleteWidget(widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +
                        model.pageId + '/widget');
                });

            /*
            widgetService.deleteWidget(widgetId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +
                model.pageId + '/widget');
                */
        }

    }

})();