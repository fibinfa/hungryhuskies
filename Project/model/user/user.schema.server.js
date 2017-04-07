module.exports = function () {
    var mongoose = require('mongoose');
    // var WebsiteSchema = require('../website/website.schema.server')();

    var UserSchema = mongoose.Schema({
        username: String,
        role: {type: String, enum: ['USER', 'OWNER', 'ADMIN', 'CRITIC']},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        // restaurants: [{type:mongoose.Schema.Types.ObjectId, ref: 'RestaurantModel'}],
        dateCreated: {type: Date, default: Date.now},
        facebook: {
            id:    String,
            token: String,
            displayName: String
        },
        google: {
            id:    String,
            token: String
        }
    }, {collection: 'user'});

    return UserSchema;
};
