(function () {
    angular
        .module("HungryApp")
        .controller("ProfileController",profileController);

    function profileController($routeParams,$location,UserService,$rootScope, FlickerService) {
        var vm=this;
        var userId=$rootScope.currentUser.data._id;
        vm.update=update;
        vm.deleteUser=deleteUser;
        vm.logout = logout;
        vm.searchPhotos =searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.showPhotos = false;

        function init(){
   // var promise = UserService
            //     //.findUserById(userId);
            //     .findCurrentUser();
            // promise.success(function (user) {
            //     vm.user=angular.copy(user);
            // });

            vm.user = $rootScope.currentUser.data;
            console.log(vm.user);

        }
        init();

        function selectPhoto(user,photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            user.url=url;
            vm.searchText="";
            update(user);
        }


        function searchPhotos(searchText) {
            vm.showPhotos=!vm.showPhotos;
            FlickerService.searchPhotos(searchText)
                .then(function(response){
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function update(newUser) {
            vm.showPhotos=false;
            UserService
                .updateUser(newUser)
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