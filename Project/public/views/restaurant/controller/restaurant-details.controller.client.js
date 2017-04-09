(function () {
    angular
        .module("HungryApp")
        .controller("RestaurantDetailController", RestaurantDetailController)
        // .directive("map", initMap);

    function RestaurantDetailController($scope,$routeParams,RestaurantService,$rootScope) {


    var vm = this;
    var restaurantId = $routeParams.rid;
    // vm.initMap = initMap;


    function init() {
        vm.currentUser = $rootScope.currentUser;

        RestaurantService
            .findRestaurantByIdYelp(restaurantId)
            .then(
                function (res) {
                    // console.log(res.data.location.coordinate.latitude);
                    vm.data = res.data;


                    console.log(vm.data);
                    // $scope.lat =res.data.location.coordinate.latitude;
                    // $scope.lng =res.data.location.coordinate.longitude;
                    // console.log($scope.lat);
                    // console.log($scope.lng);
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

        //
        // function initMap() {
        //     var uluru = {lat: vm.lat, lng: vm.lng};
        //     var map = new google.maps.Map(document.getElementById('map'), {
        //         zoom: 7,
        //         center: uluru
        //     });
        //     var marker = new google.maps.Marker({
        //         position: uluru,
        //         map: map
        //     });
        // }
    }
    
//     function initMap() {
//
//
//             var scope = angular.element("#map").scope();
//             var lt =  window.lat;
//             var lg =  window.lng;
//
//             console.log(window.lat);
//             var uluru = {lat: lt, lng: lg};
// //        console.log(scope)
//             var map = new google.maps.Map(document.getElementById('map'), {
//                 zoom: 8,
//                 center: uluru
//             });
//             var marker = new google.maps.Marker({
//                 position: uluru,
//                 map: map
//             });
//         }

})();