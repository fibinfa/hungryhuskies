(function(){
    angular
        .module("HungryApp")
        .service("RestaurantService",RestaurantService);


    function RestaurantService($http){
        var api = {
            findAllRestaurantsByCategory : findAllRestaurantsByCategory,
            findAllRestaurantsByTerm: findAllRestaurantsByTerm,
            findRestaurantByIdYelp: findRestaurantByIdYelp,
            findRestaurantById: findRestaurantById,
            createRestaurant: createRestaurant,
            updateRestaurant: updateRestaurant
        };
        return api;

        function updateRestaurant(restaurantId, newRestaurant) {
            return $http.put("/api/restaurant/"+restaurantId, newRestaurant);
        }

        function findRestaurantById(restaurantId) {
            return $http.get("/api/restaurant/"+restaurantId);
        }

        function createRestaurant(newRestaurant) {
            return $http.post("/api/restaurant/new", newRestaurant);
        }

        function findRestaurantByIdYelp(restaurantId){
            return $http.get("/api/yelp/restaurant/"+restaurantId);
        }

        function findAllRestaurantsByTerm(searchObject) {
            return $http.get("/api/yelp/searchByTerm?term="+searchObject.term+"&location="+searchObject.location);
        }

        function findAllRestaurantsByCategory(category) {
            return $http.get("/api/yelp/searchByCategory?category="+category);
        }
    }
})();