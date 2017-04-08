module.exports = function () {
    var mongoose =  require("mongoose");
    // var BusinessSchema = require("../business/business.schema.server")();

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        role: {type: String, enum: ['USER', 'OWNER', 'CRITIC', 'ADMIN'],default: 'USER'},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        company: String,
        url: String,
        businesses: {type:mongoose.Schema.Types.ObjectId, ref: 'BusinessModel'},
        dateCreated: {type: Date, default: Date.now()},
        facebook: {
            id:    String,
            token: String,
            displayName: String
        },
        google: {
            token: String,
            id: String,
            displayName: String
        }
    }, {collection: "user"});

    return UserSchema;
};