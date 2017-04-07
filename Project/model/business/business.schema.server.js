module.exports = function () {
    var mongoose =  require("mongoose");
    // var ReviewSchema = require("../review/review.schema.server")();

    var BusinessSchema = mongoose.Schema({
        _id: {type: String, required: true},
        name: String,
        phone: String,
        imageUrl: String,
        ratingUrl: String,
        reviews: {type:mongoose.Schema.Types.ObjectId, ref: 'BusinessModel'},
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "business"});

    return BusinessSchema;
};