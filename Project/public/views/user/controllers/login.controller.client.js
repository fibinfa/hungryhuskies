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
            var promise = UserService
                .login(user);
            promise.then(function (loginUser) {
                 //console.log(loginUser);
                    $rootScope.currentUser = user;
                if(loginUser !=null){
                    $location.url('/user/'+loginUser._id)
                }
                else{
                    vm.error="User not found";
                }
            },
            function (error) {
                vm.error="Username and password do not match";
            });
        }
    }
})();