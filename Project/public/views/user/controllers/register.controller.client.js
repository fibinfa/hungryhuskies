(function(){
    angular
        .module("HungryApp")
        .controller("RegisterController", registerController);
    
    function registerController(UserService,$location) {
        var vm=this;
        vm.createUser=createUser;
        vm.register=register;

        function createUser(user){
            console.log(user);
            UserService
                .createUser(user)
                .success(function (user) {
                    var userId=user._id;
                    $location.url("/user/"+userId);
                });
        }
        
        function register(user) {
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.message = "Username already exists";
                })
                .error(function(err){
                    vm.message = "Available";
                    createUser(user);
                })
        }

    }
})();