(function () {
    angular
        .module("HungryApp")
        .controller("ProfilePageController", profilePageController);

    function profileDisplayController($routeParams, $location, UserService, $rootScope) {
        var vm = this;
        var followUser = followUser;
        var unFollowUser = unFollowUser;

        function init() {
            vm.user = $rootScope.currentUser.data;
            var userId = $routeParams.uid;
            var username = $routeParams.username;


            UserService
                .findUserByUsername(username)
                .then(
                    function (response) {
                        vm.profileUser = response.data;
                    }
                );

        }
        init();
    }

});
