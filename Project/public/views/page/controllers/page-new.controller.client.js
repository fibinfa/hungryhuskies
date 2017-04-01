(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId=$routeParams.wid;
        vm.createPage = createPage;
        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (website) {
                    vm.pages =website. pages;
                });
        }
        init();

        function createPage (page) {
            if(page!=undefined && page.name!=null) {
                PageService
                    .createPage(vm.websiteId, page)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    });
            }
        };
    }
})();