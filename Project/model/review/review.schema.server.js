module.exports = function () {
    var mongoose =  require("mongoose");
     var CommentSchema = require("../comment/comment.schema.server")();

    var ReviewSchema = mongoose.Schema({
        username: String,
        // restaurantId: {type:mongoose.Schema.Types.ObjectId, ref: 'RestaurantModel'},
        content: String,
        rating: Number,
        isCritic: Boolean,
        comments: [CommentSchema],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "review"});

    return ReviewSchema;
};