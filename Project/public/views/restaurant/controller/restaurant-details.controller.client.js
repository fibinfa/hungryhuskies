(function () {
    angular
        .module("HungryApp")
        .controller("RestaurantDetailController", RestaurantDetailController);




    function RestaurantDetailController($routeParams,RestaurantService,$rootScope,UserService, ReviewService) {

        var vm = this;
        var restaurantId = $routeParams.rid;
        vm.likeRestaurant = likeRestaurant;
        vm.dislikeRestaurant = dislikeRestaurant;
        vm.createReview = createReview;
        // vm.deleteReview = deleteReview;
        vm.findBusiness = findBusiness;
        vm.createReview = createReview;



        function createReview(reviewText, rating) {
            if(vm.currentUser) {
                var review = {
                    username: vm.currentUser.username,
                    content: reviewText,
                    rating: rating
                };
                var restaurant=vm.data;
                var newRestaurant = {
                    _id: restaurant.id,
                    imageUrl: restaurant.image_url,
                    name: restaurant.name,
                    phone: restaurant.phone,
                    ratingUrl: restaurant.rating_img_url
                };

                ReviewService
                    .createReview(review)
                    .then(
                        function (res) {
                            var newReview = res.data;
                            RestaurantService
                                .findRestaurantById(restaurant.id)
                                .then(
                                    function (response) {
                                        var restaurant = response.data;
                                        if(!restaurant) {
                                            newRestaurant.reviews=[];
                                            newRestaurant.reviews.push(newReview);
                                            return RestaurantService
                                                .createRestaurant(newRestaurant);
                                        }   else {
                                            restaurant.reviews.push(newReview);
                                            RestaurantService
                                                .updateRestaurant(restaurant._id, restaurant)
                                                .then(
                                                    function (stats) {
                                                        // vm.reviewEnabled = false;
                                                        return;
                                                    },
                                                    function (err) {
                                                        // vm.reviewEnabled = false;
                                                        return;
                                                    }
                                                );
                                            findBusiness();
                                        }
                                    },
                                    function (error) {
                                        vm.error = "Error finding business with id";
                                    }
                                )
                                .then(
                                    function (res) {
                                        if(res) {
                                            var restaurantReceived = res.data;
                                            restaurantReceived.reviews.push(newReview);
                                            RestaurantService
                                                .updateRestaurant(restaurantReceived._id, restaurantReceived)
                                                .then(
                                                    function (stats) {
                                                        // vm.reviewEnabled = false;
                                                        findBusiness();
                                                    },
                                                    function (err) {
                                                    }
                                                );
                                            findBusiness();
                                        }
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                );
                        },
                        function (err) {
                            vm.error="Error creating review";
                        }
                    );


            }
        }

        function init() {
            vm.currentUser = $rootScope.currentUser.data;


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

            findBusiness();

            if(vm.currentUser) {
                UserService
                    .findUserById(vm.currentUser._id)
                    .then(
                        function (res) {
                            var user = res.data;
                            vm.username = user.username;
                            var restaurantArray = user.restaurants;
                            vm.liked = search(restaurantId, restaurantArray);
                        },
                        function (err) {
                            vm.error = "User not found";
                        }
                    );
                vm.deleteEnable = true;
            }



        }

        function findBusiness() {
            RestaurantService
                .findRestaurantById(restaurantId)
                .then(
                    function (res) {
                        vm.localBusiness = res.data;
                    }
                );
        }

        function search(restaurantId, restaurantArray) {
            for (var i=0; i < restaurantArray.length; i++) {
                if (restaurantArray[i]._id === restaurantId) {
                    return true;
                }
            }
            return false;
        }
        init();




        function likeRestaurant(restaurant) {
            var currentUser = $rootScope.currentUser.data;

            if(currentUser) {
                var newRestaurant = {
                    _id: restaurant.id,
                    imageUrl: restaurant.image_url,
                    name: restaurant.name,
                    phone: restaurant.phone,
                    ratingUrl: restaurant.rating_img_url
                };

                RestaurantService
                    .findRestaurantById(restaurant.id)
                    .then(
                        function (response) {
                            var restaurant = response.data;
                            if(!restaurant) {
                                RestaurantService
                                    .createRestaurant(newRestaurant)
                                    .then(
                                        function (res) {
                                            console.log(res.data);
                                        },
                                        function (err) {
                                            console.log(err);
                                        }
                                    );
                            }
                        },
                        function (error) {
                            vm.error = "Error finding restaurant with id";
                        }
                    );

                UserService
                    .findUserById(currentUser._id)
                    .then(
                        function (res) {
                            var user = res.data;
                            user.restaurants.push(newRestaurant);
                            console.log(user.restaurants);
                            UserService
                                .updateUser(user._id, user)
                                .then(
                                    function (stats) {
                                        vm.liked = true;
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                );
                        },
                        function (err) {
                            console.log(err);
                        }
                    );

            } else {
                $location.url("/login");
            }

        }


        function dislikeRestaurant(restaurantId) {
            var currentUser = $rootScope.currentUser;

            if(currentUser) {
                UserService
                    .findUserById(currentUser.data._id)
                    .then(
                        function (res) {
                            var user = res.data;
                            user.restaurants.splice(user.restaurants.indexOf(restaurantId, 1));

                            UserService
                                .updateUser(user._id, user)
                                .then(
                                    function (stats) {
                                        vm.liked = false;
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                );
                        },
                        function (err) {
                            console.log(err);
                        }
                    )

            } else {
                $location.url("/login");
            }

        }



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