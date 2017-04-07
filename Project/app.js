module.exports = function(app) {
    var model = require("./model/models.server.js")();
    require("./services/restaurant.service.server.js")(app,model);
    require("./services/user.service.server.js")(app,model);
};