/**
 * Created by eylamfried on 5/28/17.
 */
/**
 * Created by eylamfried on 5/28/17.
 */

(function () {
    angular
        .module('WAM')
        .service('FlickrService', FlickrService);

    function FlickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "be63fb748c0ce5677af6163e431ee392";
        var secret = "cc0ab29a7833ae51";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);

        }

    }

})();

