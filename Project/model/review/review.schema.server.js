module.exports = function () {
    var mongoose =  require("mongoose");
     var CommentSchema = require("../comment/comment.schema.server")();

    var ReviewSchema = mongoose.Schema({
        user: {type:mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        content: String,
        rating: Number,
        comments: [CommentSchema],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "review"});

    return ReviewSchema;
};