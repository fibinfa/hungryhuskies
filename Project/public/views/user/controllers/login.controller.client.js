/**
 * Created by fibin on 10-02-2017.
 */
(function(){
    angular
        .module("HungryApp")
        .controller("LoginController", loginController);
    
    function loginController(UserService,$location,$rootScope) {
        var vm=this;
        vm.login=login;
        function login(user){
            // var promise = UserService
            //     .findUserByCredentials(user.username,user.password);
            var promise =
                UserService
                .login(user);
            promise.then(function (loginUser) {


                if(loginUser !=null){
                    $rootScope.currentUser = loginUser;
                    $location.url('/user/'+loginUser._id)
                }
                else{
                    $rootScope.currentUser = null;

                    vm.error="User not found";
                }
            },
            function (error) {
                vm.error="Username and password do not match";
            });
        }
    }
})();