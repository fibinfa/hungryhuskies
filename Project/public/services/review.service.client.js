(function(){
    angular
        .module("HungryApp")
        .service("ReviewService",ReviewService);


    function ReviewService($http){
        var api = {
            createReview: createReview,
            deleteReview: deleteReview
        };
        return api;

        function deleteReview(reviewId) {
            return $http.delete("/api/review/"+reviewId);
        }

        function createReview(review) {
            return $http.post("/api/review", review);
        }
    }
})();