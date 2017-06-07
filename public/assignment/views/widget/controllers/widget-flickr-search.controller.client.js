/**
 * Created by eylamfried on 6/3/17.
 */

(function () {

    angular
        .module('WAM')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService, widgetService, $routeParams, $location) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.userId = $routeParams['userId'];
        model.widgetCopy = {};

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widget = {
                _id: model.widgetId,
                name: '',
                text: '',
                url: url,
                widgetType: 'IMAGE',
                pageId: model.pageId,
                width: '100%'
            };

            widgetService
                .createWidget(model.pageId, widget)
                .then(function() {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +
                        model.pageId + '/widget/' + model.widgetId);
                });
        }

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {

                    data = response.data.replace("jsonFlickrApi(","");
                    // data is now a string with an extra ')'
                    data = data.substring(0,data.length - 1);
                    // convert from string to json obj
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
    }

})();