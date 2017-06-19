/**
 * Created by eylamfried on 6/18/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController(currentUser) {
        var model = this;

        model.currentUser = currentUser;

    }
})();