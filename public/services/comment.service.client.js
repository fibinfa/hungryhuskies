(function(){
    angular
        .module("HungryApp")
        .service("CommentService",CommentService);


    function CommentService($http){
        var api = {
            createComment: createComment,
            deleteComment: deleteComment
            // updateReview: updateReview
        };
        return api;

        // function updateReview(reviewId, newReview) {
        //     return $http.put("/api/review/"+reviewId, newReview);
        // }

        function deleteComment(commentId) {
            return $http.delete("/api/comment/"+commentId);
        }

        function createComment(comment) {
            return $http.post("/api/comment", comment);
        }
    }
})();