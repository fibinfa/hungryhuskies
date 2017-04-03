(function () {
    angular
        .module("HungryApp")
        .controller("RestaurantListController", RestaurantListController);

    function RestaurantListController($location, RestaurantService, $routeParams, $rootScope) {
        var vm = this;
        vm.findApiAllBusinessByTerm = findApiAllBusinessByTerm;
        vm.findApiBusinessById = findApiBusinessById;
        vm.findAllRestaurantsByCategory = findAllRestaurantsByCategory;

        var category = $routeParams.category;
        var searchTerm = $routeParams.searchTerm;

        function init() {
            // vm.currentUser = $rootScope.currentUser;

            if(category) {
                RestaurantService
                    .findAllRestaurantsByCategory(category)
                    .then(
                        function (res) {
                            vm.data = res.data;
                        }
                    );
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

        function findApiBusinessById(businessId) {
            BusinessService
                .findApiBusinessById(businessId)
                .then(
                    function (res) {
                        vm.data = res.data;
                        $location.url("/business/"+businessId);
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