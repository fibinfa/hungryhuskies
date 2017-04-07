(function () {
    angular
        .module("HungryApp")


        // .config(function($locationProvider) {
        //     $locationProvider.hashPrefix('!');})
        //
        // .run(function($location) {
        //     $location.path('/');
        // })


        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider

            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })


            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html'
                // controller: 'LoginController',
                // controllerAs: 'model'
            })
            .when("/yelp", {
                templateUrl: "views/yelp.html",
                controller: "YelpSearchController",
                controllerAs: "model"
            })
            .when("/search/:category", {
            templateUrl: "views/restaurant/template/restaurant-list.view.client.html",
            controller: "RestaurantListController",
            controllerAs: "model"
            })
            .when("/search/:searchTerm/location/:location", {
                templateUrl: "views/restaurant/template/restaurant-list.view.client.html",
                controller: "RestaurantListController",
                controllerAs: "model"})
        .when("/register",{
            templateUrl: 'views/user/templates/register.view.client.html',
            controller: 'RegisterController',
            controllerAs: 'model'
        });
        // .when("/register",{
        //     templateUrl: 'views/user/templates/register.view.client.html',
        //     controller: 'RegisterController',
        //     controllerAs: 'model'
        // })
        // .when("/user",{
        //     templateUrl: 'views/user/templates/profile.view.client.html',
        //     controller: 'ProfileController',
        //     controllerAs: 'model',
        //     resolve: {
        //         checkLoggedIn: checkLoggedIn
        //     }
        // })
        // .when("/user/:uid",{
        //     templateUrl: 'views/user/templates/profile.view.client.html',
        //     controller: 'ProfileController',
        //     controllerAs: 'model',
        //     resolve: {
        //         checkLoggedIn: checkLoggedIn
        //     }
        // })
        // .when("/user/:uid/website",{
        //     templateUrl: 'views/website/templates/website-list.view.client.html',
        //     controller: "WebsiteListController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/new",{
        //     templateUrl: 'views/website/templates/website-new.view.client.html',
        //     controller: "NewWebsiteController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid",{
        //     templateUrl: 'views/website/templates/website-edit.view.client.html',
        //     controller: "EditWebsiteController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page",{
        //     templateUrl: 'views/page/templates/page-list.view.client.html',
        //     controller: "PageListController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page/new",{
        //     templateUrl: 'views/page/templates/page-new.view.client.html',
        //     controller: "NewPageController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page/:pid",{
        //     templateUrl: 'views/page/templates/page-edit.view.client.html',
        //     controller: "EditPageController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page/:pid/widget",{
        //     templateUrl: 'views/widget/templates/widget-list.view.client.html',
        //     controller: "WidgetListController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page/:pid/widget/new",{
        //     templateUrl: 'views/widget/templates/widget-chooser.view.client.html'
        //     ,controller: "NewWidgetController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
        //     templateUrl: 'views/widget/templates/widget-edit.view.client.html'
        //     ,controller: "EditWidgetController",
        //     controllerAs: "model"
        // })
        // .when("/user/:userId/website/:wid/page/:pid/widget/:wgid/flickr",{
        //     templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
        //     controller: "FlickrImageSearchController",
        //     controllerAs: "model"
        // });
        // function checkLoggedIn($q, UserService,$location) {
        //     var deferred = $q.defer();
        //     UserService
        //         .checkLoggedIn()
        //         .success(
        //             function (user) {
        //                 if(user !='0') {
        //                     deferred.resolve();
        //                 } else{
        //                     deferred.reject();
        //                     $location.url("/login");
        //                 }
        //             }
        //         );
        //     return deferred.promise;
        // }

    }




})();