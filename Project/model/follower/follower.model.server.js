module.exports = function () {

    var mongoose = require('mongoose');
    var FollowerSchema = require('./follower.schema.server')();
    var FollowerModel = mongoose.model('FollowerModel', FollowerSchema);
    var model ={};

    var api = {
        setModel: setModel,
        createFollower: createFollower,
        findIfFollower: findIfFollower,
        findAllFollower: findAllFollower,
        findAllFollowing: findAllFollowing,
        deleteFollower: deleteFollower

    };

    return api;

    function setModel(_model) {
        model = _model;
    }


    function createFollower (followerObj) {
        return FollowerModel.create(followerObj);
    }

    function findIfFollower (user, follow) {
        return FollowerModel.find(
            {
                username: user,
                follower: follow
            });
    }

    function findAllFollower (user) {

        return FollowerModel.find({username: user});

    }

    function findAllFollowing (follow) {
        return FollowerModel.find({follower: follow});
    }

    function deleteFollower (user, follow) {
        return FollowerModel.remove(
            {
                username: user,
                follower: follow
            });
    }

};