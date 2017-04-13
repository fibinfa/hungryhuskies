(function () {
    angular
        .module("HungryApp")
        .controller("AdminController", AdminController);

    function AdminController($location, UserService, $rootScope, $http) {
        var vm = this;
        vm.createUser = createUser;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.populate = populate;

        function init() {
            vm.currentUser = $rootScope.currentUser;
            vm.users=findAllUsers();
        }

        init();

        function createUser(user) {
            vm.user = "";
            var obj = {
                username: user.username,
                password: user.password,
                role: user.role.toUpperCase(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            };
            UserService
                .createUser(obj)
                .then(
                    function (res) {
                        vm.success = "User creation successful";
                        findAllUsers();
                    },
                    function(err) {
                        vm.error = "Unable to create user";
                    }
                );
        }

        function deleteUser(user) {
            if(user.role != 'ADMIN') {
                UserService
                    .deleteUser(user._id)
                    .then(
                        function (res) {
                            vm.success = "User delete successful";
                            findAllUsers();
                        },
                        function(err) {
                            vm.error = err;
                        }
                    );
            }
            else {
                vm.error = "Cannot delete admin";
            }
        }



        function updateUser(user) {
            console.log(user);
            UserService
                .updateUser(user._id, user)
                .then(
                    function (res) {
                        vm.user = {};
                        vm.success = "User update successful";
                        findAllUsers();
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function populate(user) {
            vm.user = angular.copy(user);
        }

        function findAllUsers() {
            UserService
                .findAllUsers()
                .then(
                    function(response) {
                        vm.users = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }
})();