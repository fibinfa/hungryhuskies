(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite=deleteWebsite;
        vm.updateWebsite=updateWebsite;
        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (user) {
                    vm.websites = user.websites;
                });

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                });
        }
        init();

        function updateWebsite(newWebsite) {
            if(newWebsite!=undefined && newWebsite.name!=null){
            WebsiteService
                .updateWebsite(vm.websiteId,newWebsite)
                .success(function (website) {
                    if(website==null){
                        vm.error="Unable to update the website";
                    }
                    else{
                        vm.message="Website succesfully updated";
                    }
                    $location.url("/user/"+vm.userId+"/website");
                });
            }

        };

        function deleteWebsite () {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                });
        };
    }
})();