(function(){
    angular
        .module("HungryApp")
        .service("ReviewService",ReviewService);


    function ReviewService($http){
        var api = {
            createReview: createReview
        };
        return api;

        function createReview(review) {
            return $http.post("/api/review", review);
        }
    }
})();