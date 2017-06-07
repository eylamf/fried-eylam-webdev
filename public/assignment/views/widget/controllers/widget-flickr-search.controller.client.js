/**
 * Created by eylamfried on 6/3/17.
 */

(function () {

    angular
        .module('WAM')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService, widgetService, $routeParams) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.userId = $routeParams['userId'];

        function selectPhoto(photo) {
            /*var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widgetService
                .updateWidget(model.websiteId, model.pageId, model.widgetId, {url: url})
                .then(function (response) {
                    console.log("Data: " + response.data);
                });
                */
        }

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
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