/**
 * Created by eylamfried on 6/7/17.
 */

(function() {
    angular
        .module('PROJ')
        .controller('yelpController', yelpController);

    function yelpController($location, yelpService) {
        // this is instead of using $scope
        var model = this;

        model.searchYelp = searchYelp;


        function searchYelp(term) {
            yelpService
                .searchYelp(term)
                .then(function (response) {
                    model.locations = response.data;
                    console.log(model.locations['id']);
                    // data = response.data;
                    // data = JSON.parse(data);
                    // model.locations = data;
                    // console.log(data);
                });
        }

    };

})();

/*
{
    "access_token": "f9v0cXyTOKnqPqew1gDFZdnI1JVtFxQKj8cEJwgp0sTI_X9RH6dqTi1pYzcPQhqq9DgexghKfOT08QH3I2GbC1Z7WTU5DcGN2NDwlBNzoo5PmCtuT_fjqr05NqQ4WXYx",
    "expires_in": 15551999,
    "token_type": "Bearer"
}
    */