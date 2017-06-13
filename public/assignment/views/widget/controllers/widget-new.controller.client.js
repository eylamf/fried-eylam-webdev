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



        /*widgetService
            .createWidget(model.pageId, model.emptyWidget)
            .then(function (response) {
                model.emptyWidget = response;
                console.log(model.emptyWidget);
            });
        */

        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.createWidget = createWidget;
        model.goToEdit = goToEdit;
        //model.updateWidget = updateWidget;


        // this needs to execute at startup
        function init() {

            model.emptyWidget = {};
            widgetService
                .createWidget(model.pageId, model.emptyWidget)
                .then(function (response) {
                    console.log("response: " +response);
                    model.emptyWidget = response;
                });


            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });


            // new feature - hw 5 - for creating a new widget from the widgetChooser
            model.widgetTypes = ["Heading",
                "Label",
                "HTML",
                "Text",
                "Link",
                "Button",
                "Image",
                "YouTube",
                "Data Table",
                "Repeater"];
            //model.widgets = widgetService.findWidgetsByPageId(model.pageId);


        }
        init();


        function goToEdit(widgetType) {
            model.emptyWidget.type = widgetType.toUpperCase();

            widgetService
                .updateWidget(model.emptyWidget._id, model.emptyWidget)
                .then(function (response) {
                    $location.url(
                        '/user/' + model.userId
                        + '/website/' + model.websiteId
                        + '/page/' + model.pageId
                        + '/widget/' + model.emptyWidget._id);
                });




        }


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


        function getYouTubeEmbedUrl(youtubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            // split at '/' to get the video id (last segment)
            var linkParts = youtubeLink.split('/');
            var id = linkParts[linkParts.length - 1];
            embedUrl += id;
            // must use $sce for trust issue
            return $sce.trustAsResourceUrl(embedUrl);
        }

        // function updateWidget(type) {
        //
        //     model.emptyWidget.type = type;
        //
        //     if (type === "Text Input") {
        //         model.emptyWidget.type = "TEXT";
        //     }
        //
        //     widgetService
        //         .updateWidget(model.emptyWidget._id, model.emptyWidget)
        //         .then(function (response) {
        //             $location.url = '/user/' + model.userId + '/website/' + model.websiteId
        //             + '/page/' + model.pageId + '/widget/' + model.emptyWidget._id;
        //         });
        // }



    }

})();