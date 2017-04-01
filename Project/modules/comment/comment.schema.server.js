module.exports = function () {
    var mongoose =  require("mongoose");

    var CommentSchema = mongoose.Schema({
        _username: {type: String, required: true},
        content: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "comment"});

    return CommentSchema;
};