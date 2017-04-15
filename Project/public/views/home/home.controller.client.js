(function () {
    angular
        .module("HungryApp")
        .controller("HomeController", HomeController);

    function HomeController($location, RestaurantService) {
        var vm = this;

        vm.findAllRestaurantsByCategory = findAllRestaurantsByCategory;
        // vm.findAllRestaurantsByTerm = findAllRestaurantsByTerm;

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

        function findAllRestaurantsByTerm(searchTerm) {
            RestaurantService
                .findAllRestaurantsByTerm(searchTerm)
                .then(
                    function (res) {
                        vm.data = res.data;
                        $location.url("/searchTerm/"+searchTerm);
                    },
                    function (error) {
                        vm.error = "Sorry. There are no search results available.";
                    }
                )
        }


        function init() {

            $('#myCarousel').carousel({
                interval: 4000
            });

            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(function (position) {
                  // console.log(position.coords.latitude);
                  // console.log(position.coords.longitude);
                });
            }


        }init();
    }
})();