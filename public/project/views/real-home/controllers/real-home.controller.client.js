/**
 * Created by eylamfried on 6/25/17.
 */
(function () {
    angular
        .module('PROJ')
        .controller('realHomeController', realHomeController);

    function realHomeController(currentUser) {
        var model = this;
        model.currentUser = currentUser;
    }

})();