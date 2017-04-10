module.exports = function (app,model) {


    app.post("/api/review", createReview);


    function createReview(req, res) {
        var newReview = req.body;
        model.reviewModel
            .createReview(newReview)
            .then(
                function (review) {
                    res.json(review);
                }, function (error) {
                    res.sendStatus(400).send(error);
                    console.log(error);
                }
            );
    }


}


