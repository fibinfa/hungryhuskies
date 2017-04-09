(function () {
    angular
        .module("HungryApp")
        .controller("RestaurantDetailController", RestaurantDetailController);

    function RestaurantDetailController($routeParams,RestaurantService,$rootScope) {


    var vm = this;
    var restaurantId = $routeParams.rid;


    function init() {
        vm.currentUser = $rootScope.currentUser;

        RestaurantService
            .findRestaurantByIdYelp(restaurantId)
            .then(
                function (res) {
                    console.log(res);
                    vm.data = res.data;
                }, function (err) {
                    console.log(err);
                }
            );

        // findBusiness();


    }

    // function findBusiness() {
    //     BusinessService
    //         .findBusinessById(businessId)
    //         .then(
    //             function (res) {
    //                 vm.localBusiness = res.data;
    //             }
    //         );
    // }

    // function search(businessId, businessArray) {
    //     for (var i=0; i < businessArray.length; i++) {
    //         if (businessArray[i]._id === businessId) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    init();
    }
})();