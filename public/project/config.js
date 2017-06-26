/**
 * Created by eylamfried on 5/28/17.
 */

(function() {
    angular
        .module('PROJ') // only reading the module
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/real-home/templates/real-home.view.client.html',
                controller: 'realHomeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            /////////// ADMIN  ///////////

            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/create-user', {
                templateUrl: 'views/admin/templates/create-user.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            /////////// ANON  ///////////

            .when('/home', {
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'

            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/search', {
                templateUrl: 'views/search/templates/open-search.view.client.html',
                controller: 'openSearchController',
                controllerAs: 'model'
            })

            /////////// USER  ///////////

            .when('/user-home', {
                templateUrl: 'views/home/templates/user-home.view.client.html',
                controller: 'userHomeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/account', {
                templateUrl: 'views/user/templates/account.view.client.html',
                controller: 'accountController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/search-friend', {
                templateUrl: 'views/user/templates/search-friend.view.client.html',
                controller: 'friendController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user-search', {
                templateUrl: 'views/search/templates/user-search.view.client.html',
                controller: 'userSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            });
    }

})();

function checkAdmin($q, $location, userService) {
    var deferred = $q.defer();
    userService
        .checkAdmin()
        .then(function (currentUser) {
            if (currentUser === '0') {
                deferred.resolve({});
                $location.url('/');
            } else {
                deferred.resolve(currentUser);
            }
        });
    return deferred.promise;
}

function checkCurrentUser($q, $location, userService) {
    var deferred = $q.defer();
    userService
        .checkLoggedIn()
        .then(function (currentUser) {
            if (currentUser === '0') {
                deferred.resolve({});
            } else {
                deferred.resolve(currentUser);
            }
        });
    return deferred.promise;
}

function checkLoggedIn($q, $location, userService) {
    var deferred = $q.defer();
    userService
        .checkLoggedIn()
        .then(function (currentUser) {
            if (currentUser === '0') {
                deferred.reject();
                $location.url('/login');
            } else {
                deferred.resolve(currentUser);
            }
        });
    return deferred.promise;
}