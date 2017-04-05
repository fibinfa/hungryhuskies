(function(){
    angular
        .module("HungryApp")
        .controller("YelpSearchController",YelpSearchController);

    function YelpSearchController($routeParams,RestaurantService){
        var vm = this;
        // vm.userId = $routeParams.userId;
        // vm.websiteId = $routeParams.wid;
        // vm.pageId = $routeParams.pid;
        // vm.widgetId = $routeParams.wgid;
        vm.getBusiness = getBusiness;
        // vm.selectPhoto = selectPhoto;

        function getBusiness(search){
            RestaurantService.findAllRestaurantsByTerm(search)
                .then(function(response){
                    vm.data=response.data;
                });
        }


    }
})();