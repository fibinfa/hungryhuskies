module.exports = function (app) {

    var Yelp = require('yelp');


    var yelp = new Yelp({
        consumer_key: 'yupxaDDxBGaFZB8EauSihA',
        consumer_secret: 'nUu1ZLFOmd0WzXY9lqBYEh8MuG0',
        token: '0A602BqGVfUKZbnd_-0VRV7NShMhAYo-',
        token_secret: '4l1Cm0tjavpLMllvveQoZ7TVDN8'
    });

    app.get("/api/yelp/searchByTerm", findAllBusinessByTerm);

    function findAllBusinessByTerm(req, res) {
        var searchTerm = req.query.term;
        var location = req.query.location;
        var parameters = {
            term: searchTerm,
            location: location || 'Boston',
            limit: 10
        };

        yelp
            .search(parameters)
            .then(
                function (data) {
                    res.send(data);
                    console.log(data);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}


