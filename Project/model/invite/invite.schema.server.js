module.exports = function () {
    var mongoose =  require("mongoose");

    var InviteSchema = mongoose.Schema({
        owner: String,
        restaurant: String,
        critic: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "comment"});

    return InviteSchema;
};