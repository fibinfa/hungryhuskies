module.exports = function () {

    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);
    var model ={};

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        setModel: setModel,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function findAllWebsitesForUser(userId) {
        return UserModel
            .findById(userId)
            .populate("websites")
            .exec();
    }


    function findUserByUsername(username) {
        return UserModel.findOne(
            {
                username: username
            });
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne(
            {
                username: username,
                password: password
            });
    }

    function deleteUser(userId) {
        return UserModel.remove(
            {
                _id : userId
            }
        );
    }

    function updateUser(userId, newUser) {
        return UserModel.update(
            {_id:userId},
            {firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email}
        );
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function createUser(user) {
       return UserModel.create(user);
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel
            .findOne({"google.id": googleId});
    }


};