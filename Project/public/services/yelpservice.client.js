(function(){
    angular
        .module("HungryApp")
        .service("YelpService",YelpService);


    function YelpService($http){
        var api = {
            search : search
        };
        return api;

        function search(searchObject) {
            return $http.get("/api/yelp/searchByTerm?term="+searchObject.term+"&location="+searchObject.location);
        }
    }
})();