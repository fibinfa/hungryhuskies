(function () {
    angular
        .module("HungryApp")
        .controller("RestaurantDetailController", RestaurantDetailController);




    function RestaurantDetailController($routeParams,RestaurantService,$rootScope,UserService, ReviewService, CommentService) {

        var vm = this;
        var restaurantId = $routeParams.rid;
        vm.udpateFlag=false;
        vm.mapFlag = false;
        vm.reviewFlag = false;
        vm.showReviewFlag = false;
        vm.likeRestaurant = likeRestaurant;
        vm.dislikeRestaurant = dislikeRestaurant;
        vm.createReview = createReview;
        vm.deleteReview = deleteReview;
        vm.findBusiness = findBusiness;
        vm.createReview = createReview;
        vm.editReview = editReview;
        vm.updateReview = updateReview;
        vm.createComment = createComment;
        vm.deleteComment= deleteComment;
        vm.claimRestaurant = claimRestaurant;
        vm.toggleMap = toggleMap;
        vm.toggleReview= toggleReview;
        vm.toggleShowReview= toggleShowReview;


        function init() {
            if($rootScope.currentUser !== null) {
                vm.currentUser = $rootScope.currentUser.data;
            }else{
                vm.currentUser = null;
            }
            vm.updateFlag = false;
            vm.boxshow=false;

            RestaurantService
                .findRestaurantByIdYelp(restaurantId)
                .then(
                    function (res) {
                        // console.log(res.data.location.coordinate.latitude);
                        vm.data = res.data;

                        // initialize map
                        if(vm.mapFlag==true) {

                            var uluru = {
                                lat: vm.data.location.coordinate.latitude,
                                lng: vm.data.location.coordinate.longitude
                            };

                            var map = new google.maps.Map(document.getElementById('map'), {
                                zoom: 16,
                                center: uluru
                            });
                            var marker = new google.maps.Marker({
                                position: uluru,
                                map: map
                            });
                        }

                        // console.log(vm.data);
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
        init();


        function claimRestaurant() {
            if(vm.currentUser && vm.currentUser.role == 'OWNER'){
                var restaurant=vm.data;
                var newRestaurant = {
                    _id: restaurant.id,
                    imageUrl: restaurant.image_url,
                    name: restaurant.name,
                    phone: restaurant.phone,
                    ratingUrl: restaurant.rating_img_url,
                    owner: vm.currentUser.username
                };
                RestaurantService
                    .findRestaurantById(restaurantId)
                    .then(
                        function (res) {
                            var restaurant = res.data;
                            if (!restaurant) {
                                RestaurantService
                                    .createRestaurant(newRestaurant)
                                    .then(
                                        function (res) {
                                            UserService
                                                .findUserById(vm.currentUser._id)
                                                .then(
                                                    function (res) {
                                                        var user = res.data;
                                                        vm.username = user.username;
                                                        user.restaurants.push(newRestaurant);
                                                        UserService.
                                                            updateUser(user)
                                                            .then(function (stats) {
                                                                init();
                                                            });

                                                    })
                                        },
                                        function (err) {
                                            console.log(err);
                                        }
                                    );
                            }
                            else {
                                restaurant.owner = vm.currentUser.username;

                            RestaurantService
                                .updateRestaurant(restaurantId, restaurant)
                                .then(
                                    function (stats) {
                                        UserService
                                            .findUserById(vm.currentUser._id)
                                            .then(
                                                function (res) {
                                                    var user = res.data;
                                                    vm.username = user.username;
                                                    user.restaurants.push(restaurant);
                                                    UserService
                                                        .updateUser(user)
                                                        .then(
                                                            function (stats) {
                                                                init();
                                                            }
                                                        )

                                                })
                                    }, function (errror) {
                                        console.log("Cannot update restaurant");
                                    }
                                )
                        }}, function (err) {
                            console.log(err);
                        }
                    );
            }
        }


        function createComment(review, content) {
            if(vm.currentUser) {
                var commentObject = {
                    _username: vm.currentUser.username,
                    content: content

                };
                var restaurant=vm.data;
                var newRestaurant = {
                    _id: restaurant.id,
                    imageUrl: restaurant.image_url,
                    name: restaurant.name,
                    phone: restaurant.phone,
                    ratingUrl: restaurant.rating_img_url
                };

                CommentService
                    .createComment(commentObject)
                    .then(
                        function (res) {
                            var comment = res.data;
                            if(review.comments.length!=0){
                                review.comments.push(comment);
                            } else{
                                review.comments = [];
                                review.comments.push(comment);
                            }
                            ReviewService
                                .updateReview(review._id, review)
                                .then(
                                    function (stats) {
                                        console.log("fibin"+ review);
                                        RestaurantService
                                            .findRestaurantById(restaurant.id)
                                            .then(
                                                function (response) {
                                                    var restaurant = response.data;
                                                    var index = -1;
                                                    for(var i=0;i<restaurant.reviews.length;i++){
                                                        if(restaurant.reviews[i]._id==review._id){
                                                            index=i;
                                                            break;
                                                        }

                                                    }
                                                    restaurant.reviews[index]=review;
                                                    RestaurantService
                                                        .updateRestaurant(restaurant._id, restaurant)
                                                        .then(
                                                            function (stats) {
                                                                vm.comment.content="";
                                                                vm.showCom=false;
                                                                init();
                                                            }, function (error) {
                                                                console.log("Error in updating comment");
                                                            });

                                                }
                                            )
                                    },
                                    function (error) {
                                        console.log("Error in updating review");
                                    }
                                )
                        }, function (error) {
                            console.log("Error in creating comment");
                        }
                    );



            }
        }

        function deleteComment(reviewId, commentId) {
            ReviewService
                .findReviewById(reviewId)
                .then(
                    function (res) {
                        var review = res.data;
                        review.comments.splice(review.comments.indexOf(commentId, 1));
                        ReviewService
                            .updateReview(reviewId, review)
                            .then(
                                function (stats) {
                                    RestaurantService
                                        .findRestaurantById(restaurantId)
                                        .then(
                                            function(res){
                                                var restaurant = res.data;
                                                var index = -1;
                                                for(var i=0;i<restaurant.reviews.length;i++){
                                                    if(restaurant.reviews[i]._id==review._id){
                                                        index=i;
                                                        break;
                                                    }

                                                }
                                                restaurant.reviews[index]=review;
                                                RestaurantService
                                                    .updateRestaurant(restaurant._id, restaurant)
                                                    .then(
                                                        function (stats) {
                                                            CommentService
                                                                .deleteComment(commentId)
                                                                .then(
                                                                    function (stats) {
                                                                        init();
                                                                    }, function(error){
                                                                        console.log("Error in deleting comment");
                                                                    }
                                                                )
                                                        }, function (error) {
                                                            console.log("Error in deleting comment");
                                                        });
                                            }
                                        )
                                }
                            )
                    }
                )
        }


        function createReview(reviewText, rating) {
            if(vm.currentUser) {
                var review = {
                    username: vm.currentUser.username,
                    content: reviewText,
                    rating: rating,
                    isCritic: vm.currentUser.role == 'CRITIC'
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
                                            // newRestaurant.reviews=[];
                                            // newRestaurant.reviews.push(newReview);
                                            return RestaurantService
                                                .createRestaurant(newRestaurant);
                                        }   else {
                                            restaurant.reviews.push(newReview);
                                            RestaurantService
                                                .updateRestaurant(restaurant._id, restaurant)
                                                .then(
                                                    function (stats) {
                                                        vm.text="";
                                                        vm.rating=0;
                                                        toggleShowReview();
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
                                                        findBusiness();
                                                        vm.text="";
                                                        vm.rating=0;
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
                            alert(error+"fibin");
                        }
                    );


            }
        }



        function findBusiness() {
            RestaurantService
                .findRestaurantById(restaurantId)
                .then(
                    function (res) {
                        vm.localBusiness = res.data;
                        if(vm.localBusiness) {
                            vm.reviewArray = [];
                            vm.myReview = [];
                            vm.criticReview = [];
                            if (vm.currentUser != null) {
                                for (var i = 0; i < res.data.reviews.length; i++) {
                                    var localReview = res.data.reviews[i];
                                    if (localReview.isCritic) {
                                        vm.criticReview.push(localReview);
                                    }
                                    else if (localReview.username == vm.currentUser.username) {
                                        localReview.userId = vm.currentUser._id;
                                        vm.myReview.push(localReview);
                                    } else {

                                        vm.reviewArray.push(localReview);
                                    }
                                }
                            } else {
                                vm.reviewArray = res.data.reviews;
                            }
                        }
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
                                            // console.log(res.data);
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
                            // console.log(user.restaurants);
                            UserService
                                .updateUser(user)
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
                                .updateUser( user)
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



        function deleteReview(restaurant, reviewId) {
            RestaurantService
                .findRestaurantById(restaurantId)
                .then(
                    function (res) {
                        var restaurant = res.data;
                        restaurant.reviews.splice(restaurant.reviews.indexOf(reviewId, 1));

                        RestaurantService
                            .updateRestaurant(restaurant._id, restaurant)
                            .then(
                                function (stats) {
                                    ReviewService
                                        .deleteReview(reviewId)
                                        .then(function (status) {
                                            init();
                                        },function (error) {
                                            console.log(error);
                                            }

                                        );

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
        }

        function editReview(review, localBusiness) {
            toggleReview();
            vm.text=review.content;
            vm.rating=review.rating;
            vm.updateFlag=true;
            vm.review= review;
            vm.localBusiness= localBusiness;
        }

        function updateReview(review, content, rating) {
            review.content=content;
            review.rating=rating;
            RestaurantService
                .findRestaurantById(restaurantId)
                .then(
                    function (res) {
                        var restaurant = res.data;
                        var index = -1;
                        for(var i=0;i<restaurant.reviews.length;i++){
                            if(restaurant.reviews[i]._id==review._id){
                                index=i;
                                break;
                            }

                        }
                        restaurant.reviews[index].rating=review.rating;
                        restaurant.reviews[index].content=review.content;
                        RestaurantService
                            .updateRestaurant(restaurant._id, restaurant)
                            .then(
                                function (stats) {
                                    ReviewService
                                        .updateReview(review._id, review)
                                        .then(function (status) {
                                            vm.text="";
                                            vm.rating=0;
                                            toggleShowReview();
                                                init();
                                            },function (error) {
                                                console.log(error);
                                            }

                                        );

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
        }


        function toggleMap() {
            vm.mapFlag = !vm.mapFlag;
            vm.reviewFlag = false;
            vm.showReviewFlag = false;
            init();
        }


        function toggleReview() {
            vm.reviewFlag = !vm.reviewFlag ;
            vm.mapFlag = false;
            vm.showReviewFlag = false;

        }


        function toggleShowReview() {
            vm.showReviewFlag = !vm.showReviewFlag ;
            vm.reviewFlag = false;
            vm.mapFlag = false;

        }

    }


})();