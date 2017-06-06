/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($sce, $routeParams, widgetService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.emptyWidget = {};

        // this needs to execute at startup
        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });


            //model.widgets = widgetService.findWidgetsByPageId(model.pageId);


        }
        init();


        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.createWidget = createWidget;
        model.createEmptyWidget = createEmptyWidget;

        function createWidget(pageId, widget) {
            widgetService
                .createWidget(pageId, widget)
                .then(function (response) {
                    $location.url('/user/' + model.userId + '/website/' +
                        model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }


        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
        }

        function createEmptyWidget(widgetType) {
            var widget = {
                _id: new Date().getTime() + "",
                widgetType: widgetType,
                pageId: model.pageId
            }

            model.emptyWidget = widget;
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



    }

})();