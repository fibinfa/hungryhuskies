module.exports =function() {
     var mongoose = require('mongoose');
     var connectionString='mongodb://127.0.0.1:27017/hungry';
    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }
    if(process.env.MONGODB_URI){
        connectionString = process.env.MONGODB_URI;
    }
    console.log(connectionString);
     mongoose.connect(connectionString);

     var userModel = require("./user/user.model.server")();
     var restaurantModel = require("./restaurant/restaurant.model.server")();
     var reviewModel = require("./review/review.model.server")();
     var followerModel = require("./follower/follower.model.server")();
     var commentModel = require("./comment/comment.model.server")();
     var inviteModel = require("./invite/invite.model.server")();

     var model = {
         userModel : userModel,
         restaurantModel : restaurantModel,
         reviewModel : reviewModel,
         followerModel : followerModel,
         commentModel : commentModel,
         inviteModel : inviteModel
     };

    userModel.setModel(model);
    restaurantModel.setModel(model);
    reviewModel.setModel(model);
    followerModel.setModel(model);
    commentModel.setModel(model);
    inviteModel.setModel(model);

    return model;

};