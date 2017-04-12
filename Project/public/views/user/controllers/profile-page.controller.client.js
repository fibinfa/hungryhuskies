(function () {
    angular
        .module("HungryApp")
        .controller("ProfilePageController", profilePageController);

    function profilePageController($routeParams, UserService, FollowerService, $rootScope) {
        var vm = this;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;

        var username = $routeParams.username;

        function init() {

            UserService
                .findUserByUsername(username)
                .then(
                    function (response) {

                        vm.profileUser = response.data;
                        // console.log(vm.profileUser);

                        FollowerService
                            .findAllFollowing(vm.profileUser.username)
                            .then(
                                function(following){
                                    vm.following= following;
                                }, function (err) {
                                    console.log(err);
                                }
                            )


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

                    }
                );







        }
        init();


        function followUser() {
            FollowerService
                .createFollower(vm.profileUser.username, vm.user.username)
                .then(function (status) {
                    vm.showFollow = false;
                })
        }



        function unFollowUser() {
            FollowerService
                .deleteFollower(vm.profileUser.username, vm.user.username)
                .then(function (status) {
                    vm.showFollow = true;
                })
        }


    }

})();
