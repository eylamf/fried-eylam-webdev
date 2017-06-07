/**
 * Created by eylamfried on 5/28/17.
 */
/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService($http, $routeParams) {

        // var widgets = [
        //
        //     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        //     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        //         "url": "http://lorempixel.com/400/200/"},
        //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Ever since astronomers <a href="http://gizmodo.com/new-earth-like-exoplanet-could-be-discovery-of-the-cent-1785614793#_ga=2.67003244.390029006.1495112369-1520736541.1475842057" rel="nofollow">announced the discovery</a> of an Earth-sized exoplanet <a href="http://gizmodo.com/there-may-be-an-earth-like-exoplanet-less-than-five-lig-1785457935" rel="nofollow">less than five light years</a> down the cosmic street, the question on every good space cadet’s mind has been whether or not we can colonize it. We’re not going to know if <em>Proxima b</em> is habitable <a href="http://gizmodo.com/how-well-get-our-first-big-clue-about-life-on-proxima-b-1785942106" rel="nofollow">until we can point some very powerful telescopes at it</a>, which won’t happen until next year. But until then, scientists are playing around with models—and one such modeling effort recently came to some promising conclusions.</p>'},
        //     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        //         "url": "https://youtu.be/AM2Ivdi9c4E" },
        //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        // ];


        // crud operations
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidgets: sortWidgets
        };
        return api;

        /*function createWidget(pageId, widget) {

            var newWidget = angular.copy(widget);
            newWidget._id = (new Date()).getTime() + "";
            newWidget.pageId = pageId;

            widgets.push(newWidget);
        }*/

        function sortWidgets(initial, final) {
            var pageId = $routeParams['pageId'];
            var url = '/api/assignment/user/:userId/website/:websiteId/page/' + pageId
                + '/widget?initial=' + initial + '&final=' + final;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function createWidget(pageId, widget) {

            var url = '/api/assignment/user/:userId/website/:websiteId/page/' + pageId + '/widget';
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });

            // widget._id = new Date().getTime() + "";
            // widget.pageId = pageId;
            //
            // widgets.push(widget);
        }

        function updateWidget(widgetId, widget)  {
            var url = '/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget/' + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });

            /*var found = findWidgetById(widgetId);

            var index = widgets.indexOf(found);
            widgets[index] = widget;
            */


        }

        function deleteWidget(widgetId) {
            var url = '/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget/' + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

            // var widget = widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // });
            // var index = widgets.indexOf(widget);
            // widgets.splice(index, 1);
        }

        function findWidgetById(widgetId) {
            var url = '/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget/' + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // return widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // });
        }

        function findWidgetsByPageId(pageId) {

            var url = '/api/assignment/user/:userId/website/:websiteId/page/' + pageId
                + '/widget';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var results = [];
            //
            // for (var w in widgets) {
            //     if (widgets[w].pageId === pageId) {
            //         results.push(widgets[w]);
            //     }
            // }
            //
            // return results;
        }


    }

})();

