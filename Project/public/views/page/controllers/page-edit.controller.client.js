(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage=deletePage;
        vm.updatePage=updatePage;
        function init() {
            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                });
             PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (website) {
                    vm.pages = website.pages;
                });
        }
        init();

        function updatePage(newPage) {
            if(newPage!=undefined && newPage.name!=null) {
                PageService
                    .updatePage(vm.pageId, newPage)
                    .success(function (page) {
                        if (page == null) {
                            vm.error = "Unable to update the Page";
                        }
                        else {
                            vm.message = "Page succesfully updated";
                        }
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    });
            }

        };

        function deletePage () {
            PageService
                .deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        };
    }
})();