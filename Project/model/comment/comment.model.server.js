module.exports = function () {

    var mongoose = require('mongoose');
    var CommentSchema = require('./comment.schema.server')();
    var CommentModel = mongoose.model('CommentModel', CommentSchema);
    var model ={};

    var api = {
        createComment: createComment,
        // findRestaurantById: findRestaurantById,
        // updateCommen: updateReview,
        deleteComment: deleteComment,
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
    function deleteComment(commentId) {
        return CommentModel.remove(
            {
                _id : commentId
            }
        );
    }

    // function updateReview(reviewId, newReview) {
    //     return ReviewModel.update(
    //         {_id:reviewId},
    //         {content: newReview.content,
    //             rating: newReview.rating
    //             }
    //     );
    // }

    // function findRestaurantById(restaurantId) {
    //     return RestaurantModel.findById(restaurantId);
    // }

    function createComment(comment) {
        return CommentModel.create(comment);
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