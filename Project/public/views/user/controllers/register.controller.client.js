(function(){
    angular
        .module("HungryApp")
        .controller("RegisterController", registerController);
    
    function registerController(UserService,$location, $rootScope) {
        var vm=this;
        vm.createUser=createUser;
        vm.register=register;

        function createUser(user){
            console.log(user);
            UserService
                .createUser(user)
                .success(function (user) {
                    $rootScope.currentUser = user;
                    $location.url("/user");
                });
        }
        
        function register(user) {
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.error = "Username already exists";
                })
                .error(function(err){
                    vm.message = "Available";
                    createUser(user);
                })
        }

    }
})();