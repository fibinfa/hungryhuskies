module.exports = function () {

    var mongoose = require('mongoose');
    var InviteSchema = require('./invite.schema.server')();
    var InviteModel = mongoose.model('InviteModel', InviteSchema);
    var model ={};

    var api = {
        createInvite: createInvite,
        findInvitesByCriticName: findInvitesByCriticName,
        // // findRestaurantById: findRestaurantById,
        updateInvite: updateInvite,
        // deleteInvite: deleteInvite,
        // // findUserByUsername: findUserByUsername,
        // // findUserByCredentials: findUserByCredentials,
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
    // function deleteComment(commentId) {
    //     return CommentModel.remove(
    //         {
    //             _id : commentId
    //         }
    //     );
    // }

    function updateInvite(inviteId, newInvite) {
        return InviteModel.update(
            {_id:inviteId},
            {$set: newInvite}
        );
    }

    // function findRestaurantById(restaurantId) {
    //     return RestaurantModel.findById(restaurantId);
    // }
    function findInvitesByCriticName(criticName) {
        return InviteModel.find({critic:criticName});
    }

    function createInvite(invite) {
        return InviteModel.create(invite);
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