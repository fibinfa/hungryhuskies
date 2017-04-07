module.exports =function() {
     var mongoose = require('mongoose');
     var connectionString='mongodb://127.0.0.1:27017/hungryapp';
    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }
    if(process.env.MONGODB_URI){
        connectionString = process.env.MONGODB_URI
    }
     mongoose.connect(connectionString);

     var userModel = require("./../model/user/user.model.server.js")();
     // var websiteModel = require("./website/website.model.server")();
     // var pageModel = require("./page/page.model.server")();
     // var widgetModel = require("./widget/widget.model.server")();

     var model = {
         userModel : userModel
         // websiteModel : websiteModel,
         // pageModel : pageModel,
         // widgetModel : widgetModel
     };

    userModel.setModel(model);
    // websiteModel.setModel(model);
    // pageModel.setModel(model);
    // widgetModel.setModel(model);

     return model;




};