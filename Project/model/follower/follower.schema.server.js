module.exports = function () {
    var mongoose =  require("mongoose");
    var FollowerSchema = mongoose.Schema({
        username: {type: String, required: true},
        follower: {type:String, required: true},
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "follower"});

    return FollowerSchema;
};