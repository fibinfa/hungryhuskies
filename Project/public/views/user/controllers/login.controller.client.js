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
                    console.log(loginUser);

                if(loginUser !=null){
                    console.log(loginUser.data);
                    $rootScope.currentUser = loginUser.data;
                    console.log($rootScope.currentUser);
                    $location.url('/user/')
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