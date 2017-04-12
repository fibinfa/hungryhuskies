module.exports = function (app,model) {


    app.post("/api/review", createReview);
    app.delete("/api/review/:reviewId", deleteReview);
    app.put("/api/review/:reviewId", updateReview);
    app.get("/api/review/:reviewId", findReviewById);

    function findReviewById(req, res) {
        var reviewId = req.params.reviewId;
        model.reviewModel
            .findReviewById(reviewId)
            .then(
                function (review) {
                    res.json(review);
                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review =req.body;
        model.reviewModel
            .updateReview(reviewId, review)
            .then(
                function(review){
                    res.json(review);
                }, function (error) {
                    console.log(error);
                }
            );
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        model.reviewModel
            .deleteReview(reviewId)
            .then(
                function(review){
                    res.json(review);
                }
            )
    }


    function createReview(req, res) {
        var newReview = req.body;
        model.reviewModel
            .createReview(newReview)
            .then(
                function (review) {
                    res.json(review);
                    console.log("fibin"+review);
                }, function (error) {
                    res.sendStatus(400).send(error);
                    console.log("hi"+error);
                }
            );
    }


};


