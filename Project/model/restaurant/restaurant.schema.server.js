module.exports = function () {
    var mongoose =  require("mongoose");
    var ReviewSchema = require("../review/review.schema.server")();

    var RestaurantSchema = mongoose.Schema({
        _id: {type: String, required: true},
        name: String,
        phone: String,
        imageUrl: String,
        ratingUrl: String,
        reviews: [ReviewSchema],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "restaurant"});

    return RestaurantSchema;
};