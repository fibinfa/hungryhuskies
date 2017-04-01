(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
             WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (user) {
                    vm.websites = user.websites;
                });
        }
        init();

        function createWebsite (website) {
            if(website!=undefined && website.name!=null){
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                });
            }
        };
    }
})();