module.exports = function () {

    var mongoose = require('mongoose');
    var RestaurantSchema = require('./restaurant.model.server')();
    var RestaurantModel = mongoose.model('RestaurantModel', RestaurantSchema);
    var model ={};

    var api = {
        createRestaurant: createRestaurant,
        findRestaurantById: findRestaurantById
        // updateUser: updateUser,
        // deleteUser: deleteUser,
        // findUserByUsername: findUserByUsername,
        // findUserByCredentials: findUserByCredentials,
        // setModel: setModel,
        // findAllWebsitesForUser: findAllWebsitesForUser,
        // findUserByFacebookId: findUserByFacebookId,
        // findUserByGoogleId: findUserByGoogleId
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    // function findAllWebsitesForUser(userId) {
    //     return UserModel
    //         .findById(userId)
    //         .populate("websites")
    //         .exec();
    // }
    //
    //
    // function findUserByUsername(username) {
    //     return UserModel.findOne(
    //         {
    //             username: username
    //         });
    // }
    //
    // function findUserByCredentials(username, password) {
    //     return UserModel.findOne(
    //         {
    //             username: username,
    //             password: password
    //         });
    // }
    //
    // function deleteUser(userId) {
    //     return UserModel.remove(
    //         {
    //             _id : userId
    //         }
    //     );
    // }
    //
    // function updateUser(userId, newUser) {
    //     return UserModel.update(
    //         {_id:userId},
    //         {firstName: newUser.firstName,
    //             lastName: newUser.lastName,
    //             email: newUser.email}
    //     );
    // }
    //
    function findRestaurantById(restaurantId) {
        return RestaurantModel.findById(restaurantId);
    }

    function createRestaurant(newRestaurant) {
        return RestaurantModel.create(newRestaurant);
    }

    // function findUserByFacebookId(facebookId) {
    //     return UserModel.findOne({'facebook.id': facebookId});
    // }
    //
    // function findUserByGoogleId(googleId) {
    //     return UserModel
    //         .findOne({"google.id": googleId});
    // }


};