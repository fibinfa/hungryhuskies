module.exports = function (app,model) {


    app.post("/api/invite", createInvite);
    app.get("/api/invite/:criticName", findAllInvitesByCriticName);
    // app.delete("/api/comment/:commentId", deleteComment);
    // app.put("/api/comment/:commentId", updateReview);

    // function updateReview(req, res) {
    //     var reviewId = req.params.reviewId;
    //     var review =req.body;
    //     model.reviewModel
    //         .updateReview(reviewId, review)
    //         .then(
    //             function(review){
    //                 res.json(review);
    //             }, function (error) {
    //                 console.log(error);
    //             }
    //         );
    // }

    function findAllInvitesByCriticName(req, res) {
        var criticName = req.params.criticName;
        model.inviteModel
            .findInvitesByCriticName(criticName)
            .then(
                function (invites) {
                    res.json(invites);
                }
            )
    }

    function deleteComment(req, res) {
        var commentId = req.params.commentId;
        model.commentModel
            .deleteComment(commentId)
            .then(
                function(comment){
                    res.json(comment);
                }
            )
    }


    function createInvite(req, res) {
        var newInvite = req.body;
        model.inviteModel
            .createInvite(newInvite)
            .then(
                function (newInvite) {
                    res.json(newInvite);
                }, function (error) {
                    res.sendStatus(400).send(error);
                    console.log(error);
                }
            );
    }


}


