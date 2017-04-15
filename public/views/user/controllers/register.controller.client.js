(function(){
    angular
        .module("HungryApp")
        .controller("RegisterController", registerController);
    
    function registerController(UserService,$location, $rootScope) {
        var vm=this;
        // vm.createUser=createUser;
        vm.register=register;

        function register(user){
            // console.log(user);
            UserService
                .createUser(user)
                .success(function (user) {
                    console.log(user);
                    $rootScope.currentUser = user;
                    $location.url("/user");
                })
                .error(function(err){
                    vm.error = err;
                    createUser(user);
                });
        }
        
        // function register(user) {
        //     UserService
        //         .findUserByUsername(user.username)
        //         .success(function (user) {
        //             vm.error = "Username already exists";
        //         })
        //         .error(function(err){
        //             vm.message = "Available";
        //             createUser(user);
        //         })
        // }

    }
})();