(function(){
    angular
        .module("HungryApp")
        .service("InviteService",InviteService);


    function InviteService($http){
        var api = {
            createInvite: createInvite,
            findInviteByCritic: findInviteByCritic
            // updateReview: updateReview
        };
        return api;

        // function updateReview(reviewId, newReview) {
        //     return $http.put("/api/review/"+reviewId, newReview);
        // }

        function findInviteByCritic(criticName) {
            return $http.get("/api/invite/"+criticName);
        }

        function deleteComment(commentId) {
            return $http.delete("/api/comment/"+commentId);
        }

        function createInvite(invite) {
            return $http.post("/api/invite", invite);
        }
    }
})();