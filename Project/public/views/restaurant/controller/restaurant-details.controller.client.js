(function () {
    angular
        .module("HungryApp")
        .controller("RestaurantDetailController", RestaurantDetailController);

    var vm = this;
    var restaurantId = $routeParams.restaurantId;


    function init() {
        vm.currentUser = $rootScope.currentUser;

        RestaurantService
            .findRestaurantByIdYelp(restaurantId)
            .then(
                function (res) {
                    vm.data = res.data;
                }
            );

        // findBusiness();


    }

    function findBusiness() {
        BusinessService
            .findBusinessById(businessId)
            .then(
                function (res) {
                    vm.localBusiness = res.data;
                }
            );
    }

    // function search(businessId, businessArray) {
    //     for (var i=0; i < businessArray.length; i++) {
    //         if (businessArray[i]._id === businessId) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    init();

})();