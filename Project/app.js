module.exports = function(app) {
    require("./services/yelp.service.server")(app);
};