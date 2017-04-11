module.exports = function () {

    var mongoose = require('mongoose');
    var ReviewSchema = require('./review.schema.server')();
    var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);
    var model ={};

    var api = {
        createReview: createReview,
        // findRestaurantById: findRestaurantById,
        // updateUser: updateUser,
        deleteReview: deleteReview,
        // findUserByUsername: findUserByUsername,
        // findUserByCredentials: findUserByCredentials,
        setModel: setModel
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
    function deleteReview(reviewId) {
        return ReviewModel.remove(
            {
                _id : reviewId
            }
        );
    }

    // function updateUser(userId, newUser) {
    //     return UserModel.update(
    //         {_id:userId},
    //         {firstName: newUser.firstName,
    //             lastName: newUser.lastName,
    //             email: newUser.email}
    //     );
    // }
    //
    // function findRestaurantById(restaurantId) {
    //     return RestaurantModel.findById(restaurantId);
    // }

    function createReview(review) {
        return ReviewModel.create(review);
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