(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController(WebsiteService, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (user) {
                    vm.websites = user.websites;
                });
        }
        init();

    }
})();