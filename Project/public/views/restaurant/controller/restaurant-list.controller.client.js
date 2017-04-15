(function () {
    angular
        .module("HungryApp")
        .controller("RestaurantListController", RestaurantListController);

    function RestaurantListController($location, RestaurantService, $routeParams, $rootScope) {
        var vm = this;
        vm.findApiAllBusinessByTerm = findApiAllBusinessByTerm;
        vm.findRestaurantByIdYelp = findRestaurantByIdYelp;
        vm.findAllRestaurantsByCategory = findAllRestaurantsByCategory;

        var category = $routeParams.category;
        var searchTerm = $routeParams.searchTerm;
        var location = $routeParams.location;

        function init() {
            vm.currentUser = $rootScope.currentUser;

            if(category) {
                RestaurantService
                    .findAllRestaurantsByCategory(category)
                    .then(
                        function (res) {
                            vm.data = res.data;
                        }
                    );
            } else if(searchTerm) {
                searchObj =
                    {
                        term: searchTerm,
                        location: location


                    }

                RestaurantService
                    .findAllRestaurantsByTerm(searchObj)
                    .then(
                        function (res) {
                            vm.data = res.data;
                        },
                        function (error) {
                            vm.error = "Sorry. There are no search results available.";
                        }
                    )
            }

        }

        init();

        function findApiAllBusinessByTerm(searchTerm) {
            BusinessService
                .findApiAllBusinessByTerm(searchTerm)
                .then(
                    function (res) {
                        vm.data = res.data;
                    },
                    function (error) {
                        vm.error = "Sorry. There are no search results available.";
                    }
                )
        }

        function findRestaurantByIdYelp(restaurantId) {
            RestaurantService
                .findRestaurantByIdYelp(restaurantId)
                .then(
                    function (res) {
                        vm.data = res.data;
                        $location.url("/restaurant/"+restaurantId);
                    },
                    function (err) {
                        vm.error = "Sorry! We could not find a business matching the Id";
                    }
                )
        }

        function findAllRestaurantsByCategory(category) {
            RestaurantService
                .findAllRestaurantsByCategory(category)
                .then(
                    function (res) {
                        vm.data = res.data;
                        $location.url("/search/"+category);
                    },
                    function (error) {
                        vm.error = "Sorry. There are no search results available.";
                    }
                )
        }
    }
})();