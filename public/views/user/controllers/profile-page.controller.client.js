(function () {
    angular
        .module("HungryApp")
        .controller("ProfilePageController", profilePageController);


    function profilePageController($routeParams, UserService, FollowerService, $rootScope, InviteService,$location) {

        var vm = this;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;
        vm.createInvite = createInvite;
        vm.likeFlag = false;
        vm.followerFlag= false;
        vm.followingFlag = false;
        vm.inviteFlag = false;
        vm.showInviteFlag = false;
        vm.toggleLike = toggleLike;
        vm.toggleFollower = toggleFollower;
        vm.toggleFollowing = toggleFollowing;
        vm.toggleInvite = toggleInvite ;
        vm.toggleShowInvite = toggleShowInvite ;
        vm.writeReview = writeReview;


        var username = $routeParams.username;

        function init() {


            if($rootScope.currentUser){
                vm.currentUser = $rootScope.currentUser.data;
            }else {
                vm.currentUser = null;
            }

            if(vm.currentUser && vm.currentUser.role=='CRITIC'){
                InviteService
                    .findInviteByCritic(vm.currentUser.username)
                    .then(
                        function (res) {
                            vm.invites=res.data;
                        }, function (error) {
                            console.log(error);
                        }
                    )

            }

            UserService
                .findUserByUsername(username)
                .then(function (response) {

                        vm.profileUser = response.data;
                        // console.log(vm.profileUser);

                        FollowerService
                            .findAllFollowing(vm.profileUser.username)
                            .then(
                                function(following){
                                    // vm.following= following;
                                    vm.followingUser = [];
                                    // console.log(following);
                                    for(var i=0;i<following.data.length;i++){


                                        UserService
                                            .findUserByUsername(following.data[i].username)
                                            .then(function (userObj) {
                                                // console.log(userObj);
                                                vm.followingUser.push(userObj.data);
                                            });

                                    }

                                    // console.log(vm.followingUser);


                                }, function (err) {
                                    console.log(err);
                                }
                            );


                        FollowerService
                            .findAllFollower(vm.profileUser.username)
                            .then(
                                function(follower){
                                    // vm.follower= follower;
                                    vm.followerUser = [];
                                    // console.log(follower);

                                    for(var i=0;i<follower.data.length;i++){


                                        UserService
                                            .findUserByUsername(follower.data[i].follower)
                                            .then(function (userObj) {
                                                // console.log(userObj);
                                                vm.followerUser.push(userObj.data);
                                            });

                                    }

                                    // console.log(vm.followerUser);


                                }, function (err) {
                                    console.log(err);
                                }
                            );


                        if($rootScope.currentUser && $rootScope.currentUser.data.username != vm.profileUser.username){
                            vm.user = $rootScope.currentUser.data;

                            FollowerService
                                .findIfFollower(vm.profileUser.username, vm.user.username)
                                .then(
                                    function(status){
                                        vm.showFollow = false;
                                    }, function (err) {
                                        vm.showFollow = true;
                                    }
                                )

                        }

                    },function (err) {
                        console.log(err);
                    $location.url("/");
                    }
                );


        }
        init();

        function createInvite(restaurant) {
            var newInvite={
                owner: vm.currentUser.username,
                restaurant: restaurant._id,
                critic: username,
                isReviewed: false
            };
            InviteService
                .createInvite(newInvite)
                .then(
                    function (res) {
                        init();
                    }
                );
        }


        function followUser() {
            FollowerService
                .createFollower(vm.profileUser.username, vm.user.username)
                .then(function (status) {
                    vm.showFollow = false;
                    init();
                })
        }



        function unFollowUser() {
            FollowerService
                .deleteFollower(vm.profileUser.username, vm.user.username)
                .then(function (status) {
                    vm.showFollow = true;
                    init();
                })
        }




        function toggleLike() {
            vm.likeFlag = !vm.likeFlag;
            vm.followerFlag = false;
            vm.followingFlag = false;
            vm.inviteFlag = false;
            vm.showInviteFlag =false;
        }



        function toggleFollower() {
            vm.likeFlag = false;
            vm.followerFlag = !vm.followerFlag ;
            vm.followingFlag = false;
            vm.inviteFlag = false;
            vm.showInviteFlag =false;
        }


        function toggleFollowing() {
            vm.likeFlag = false;
            vm.followerFlag = false;
            vm.followingFlag = !vm.followingFlag ;
            vm.inviteFlag = false;
            vm.showInviteFlag =false;
        }


        function toggleInvite() {
            vm.likeFlag = false;
            vm.followerFlag = false;
            vm.followingFlag = false;
            vm.inviteFlag = !vm.inviteFlag;
            vm.showInviteFlag =false;
        }


        function toggleShowInvite () {
            vm.likeFlag = false;
            vm.followerFlag = false;
            vm.followingFlag = false;
            vm.inviteFlag = false;
            vm.showInviteFlag = !vm.showInviteFlag;
        }

        function writeReview(invite) {
            invite.isReviewed=true;
            InviteService
                .updateInvite(invite._id, invite)
                .then(
                    function (stats) {
                        $location.url("/restaurant/"+invite.restaurant);
                    }
                )
        }





    }


})();
