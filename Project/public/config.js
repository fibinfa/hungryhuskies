(function () {
    angular
        .module("HungryApp")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider

            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve:{
                    getUser : getUser
                }
            })


            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model',
                resolve:{
                    getUser : getUser
                }
            })


            .when("/logout", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model',
                resolve:{
                    logOut : logOut
                }
            })

            .when("/yelp", {
                templateUrl: "views/yelp.html",
                controller: "YelpSearchController",
                controllerAs: "model",
                resolve:{
                    getUser : getUser
                }
            })

            .when("/search/:category", {
            templateUrl: "views/restaurant/template/restaurant-list.view.client.html",
            controller: "RestaurantListController",
            controllerAs: "model",
                resolve:{
                    getUser : getUser
                }
            })

            .when("/search/:searchTerm/location/:location", {
                templateUrl: "views/restaurant/template/restaurant-list.view.client.html",
                controller: "RestaurantListController",
                controllerAs: "model",
                resolve:{
                    getUser : getUser
                }
            })

            .when("/register",{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })


            .when("/user",{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/user/:username",{
                templateUrl: 'views/user/templates/profile-page.view.client.html',
                controller: 'ProfilePageController',
                controllerAs: 'model',
                // resolve: {
                //     checkLoggedIn: checkLoggedIn
                // }
            })

            .when("/restaurant/:rid",{
                templateUrl: 'views/restaurant/template/restaurant-details.view.client.html',
                controller: 'RestaurantDetailController',
                controllerAs: 'model',
                resolve:{
                    getUser : getUser
                }


            })

            .otherwise({
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve:{
                    getUser : getUser
                }


            });




        function checkLoggedIn($q, UserService,$location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLoggedIn()
                .then(
                    function (user) {
                        if(user.data !='0') {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        } else{
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        }
                    },
                    function(err) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }


        function getUser ($q, UserService,$location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLoggedIn()
                .then(
                    function (user) {
                        if(user.data !='0') {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        } else{
                            $rootScope.currentUser = null;
                            deferred.resolve();

                        }
                    }
                );
            return deferred.promise;
        }

    }


    function logOut($q,UserService,$rootScope){
        var deferred = $q.defer();
        UserService
            .logout()
            .then(
                function () {
                    $rootScope.currentUser = null;
                    deferred.resolve();
                }
            );
        return deferred.promise;
    }


})();