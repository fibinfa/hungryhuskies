module.exports = function (app,model) {

    var Yelp = require('yelp');

    var yelp = new Yelp({
        consumer_key: 'yupxaDDxBGaFZB8EauSihA',
        consumer_secret: 'nUu1ZLFOmd0WzXY9lqBYEh8MuG0',
        token: '0A602BqGVfUKZbnd_-0VRV7NShMhAYo-',
        token_secret: '4l1Cm0tjavpLMllvveQoZ7TVDN8'
    });

    app.get("/api/yelp/searchByTerm", findAllRestaurantsByTerm);
    app.get("/api/yelp/searchByCategory", findAllRestaurantsByCategory);
    app.get("/api/yelp/restaurant/:restaurantId", findRestaurantByIdYelp);
    app.post("/api/restaurant/new", createRestaurant);
    app.get("/api/restaurant/:restaurantId", findRestaurantById);
    app.put("/api/restaurant/:restaurantId", updateRestaurant);


    function updateRestaurant(req, res) {
        var restaurantId = req.params.restaurantId;
        var restaurant = req.body;
        model.restaurantModel
            .updateRestaurant(restaurantId, restaurant)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (error) {
                res.sendStatus(400).send(error);
            })
    }


    function findRestaurantById(req, res) {
        var restaurantId = req.params.restaurantId;
        model.restaurantModel
            .findRestaurantById(restaurantId)
            .then(
                function (restaurant) {
                    res.json(restaurant);
                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createRestaurant(req, res) {
        var newRestaurant = req.body;
        model.restaurantModel
            .createRestaurant(newRestaurant)
            .then(
                function (restaurant) {
                    res.json(restaurant);
                }, function (error) {
                      res.sendStatus(400).send(error);
                }
            );
    }

    function findRestaurantByIdYelp(req, res) {
        var restaurantId = req.params.restaurantId;
        yelp
            .business(restaurantId)
            .then(
                function(business) {
                    res.send(business);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllRestaurantsByTerm(req, res) {
        var searchTerm = req.query.term;
        var location = req.query.location;
        var parameters = {
            term: searchTerm,
            location: location || 'Boston',
            limit: 15
        };

        yelp
            .search(parameters)
            .then(
                function (data) {
                    res.send(data);
                    // console.log(data);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllRestaurantsByCategory(req, res) {
        var category = req.query.category;
        var parameters = {
            category_filter: category,
            location: 'Boston',
            limit: 18
        };

        yelp
            .search(parameters)
            .then(
                function (data) {
                    res.send(data);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};


