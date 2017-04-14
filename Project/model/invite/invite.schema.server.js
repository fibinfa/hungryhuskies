module.exports = function () {
    var mongoose =  require("mongoose");

    var InviteSchema = mongoose.Schema({
        owner: String,
        restaurant: String,
        critic: String,
        isReviewed: {type: Boolean, default:false},
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "invite"});

    return InviteSchema;
};