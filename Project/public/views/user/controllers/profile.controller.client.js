/**
 * Created by fibin on 10-02-2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",profileController);
    function profileController($routeParams,$location,UserService,$rootScope) {
        var vm=this;
        var userId=$routeParams['uid'];
        vm.update=update;
        vm.deleteUser=deleteUser;
        vm.logout = logout;

        function init(){
            var promise = UserService
                //.findUserById(userId);
                .findCurrentUser();
            promise.success(function (user) {
                vm.user=angular.copy(user);
            });
        }
        init();

        function update(newUser) {
            UserService
                .updateUser(userId,newUser)
                .success(function (user) {
                    if(user==null){
                        vm.error="Unable to update the user";
                    }
                    else{
                        vm.message="User succesfully updated";
                    }
                });
        }

        function deleteUser() {
                UserService
                    .deleteUser()
                    .success(function () {
                        $location.url("/login");
                    });
            }

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                })
        }
    }
})();