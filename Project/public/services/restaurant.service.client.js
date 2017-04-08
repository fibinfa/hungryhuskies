(function(){
    angular
        .module("HungryApp")
        .service("RestaurantService",RestaurantService);


    function RestaurantService($http){
        var api = {
            findAllRestaurantsByCategory : findAllRestaurantsByCategory,
            findAllRestaurantsByTerm: findAllRestaurantsByTerm,
            findRestaurantByIdYelp: findRestaurantByIdYelp
        };
        return api;

        function findRestaurantByIdYelp(restaurantId){
            return $http.get("/api/yelp/restaurant"+restaurantId);
        }

        function findAllRestaurantsByTerm(searchObject) {
            return $http.get("/api/yelp/searchByTerm?term="+searchObject.term+"&location="+searchObject.location);
        }

        function findAllRestaurantsByCategory(category) {
            return $http.get("/api/yelp/searchByCategory?category="+category);
        }
    }
})();