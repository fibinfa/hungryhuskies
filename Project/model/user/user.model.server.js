module.exports = function () {

    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);
    var model ={};

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        updateUrl: updateUrl,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        setModel: setModel,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        findAllUsers: findAllUsers
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function findAllUsers() {
        return UserModel
            .find();
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
            {$set:newUser}
        );
    }


    function updateUrl(userId, newurl) {
        return UserModel.update(
            {_id:userId},
            {url:newurl}
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