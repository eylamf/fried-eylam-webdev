/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($sce, $routeParams, widgetService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        // this needs to execute at startup
        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.emptyWidgetHeader = {
                _id: new Date().getTime(),
                widgetType: "HEADING",
                pageId: model.pageId,
                size: "",
                text: ""
            };
            console.log(model.emptyWidgetHeader._id);

        }
        init();


        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;


        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
        }

        function createEmptyWidget(widgetType) {

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