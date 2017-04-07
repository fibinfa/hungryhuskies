module.exports = function () {
    var mongoose =  require("mongoose");
    var BusinessSchema = require("../business/business.schema.server")();

    var ReviewSchema = mongoose.Schema({
        user: {type:mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        content: String,
        rating: Number,
        comments: {type:mongoose.Schema.Types.ObjectId, ref: 'CommentModel'},
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "review"});

    return ReviewSchema;
};