module.exports = function () {
    var mongoose =  require("mongoose");
    var RestaurantSchema = require("../restaurant/restaurant.schema.server")();

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        role: {type: String, enum: ['USER', 'OWNER', 'CRITIC', 'ADMIN'],default: 'USER'},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone:Number,
        url: String,
        restaurants: [RestaurantSchema],
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