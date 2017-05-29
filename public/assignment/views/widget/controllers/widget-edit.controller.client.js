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
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
            model.widgetCopy = angular.copy(model.widget);
            model.emptyWidgetHeader = {
                _id: new Date().getTime(),
                widgetType: "HEADING",
                pageId: model.pageId,
                size: "",
                text: ""
            };
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

        function createWidget(pageId, widgetType) {
            widgetService.createWidget(pageId, widgetType);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +
                model.pageId + '/widget');

        }

        function updateWidget(widgetId, widget) {
            widgetService.updateWidget(widgetId, widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +
                model.pageId + '/widget');
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +
                model.pageId + '/widget');
        }

    }

})();