/**
 * Created by eylamfried on 6/8/17.
 */

(function() {
    angular
        .module('PROJ')
        .controller('loginController', loginController);

    function loginController($location) {
        // this is instead of using $scope
        var model = this;

        model.loginUser = loginUser;


        function loginUser(username, password) {
            console.log(username, password);
        }



    };

})();