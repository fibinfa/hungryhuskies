module.exports = function (app,model) {


    app.post("/api/comment", createComment);
    app.delete("/api/comment/:commentId", deleteComment);
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


    function createComment(req, res) {
        var newComment = req.body;
        model.commentModel
            .createComment(newComment)
            .then(
                function (comment) {
                    res.json(comment);
                }, function (error) {
                    res.sendStatus(400).send(error);
                    console.log(error);
                }
            );
    }


}


