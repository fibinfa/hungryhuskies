module.exports = function (app,model) {

    app.post("/api/follow", createFollower);
    app.get("/api/follow", findFollow);
    app.delete("/api/follow", deleteFollower);



    function createFollower(req, res) {
        var follower = req.body;
        model
            .followerModel
            .createFollower(follower)
            .then(function (follower) {
                    res.json(follower);
                }, function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findFollow(req, res) {

        var username = req.query.username;
        var follower = req.query.follower;

        if(follower&&username){
            findIfFollower(req, res);
        }else if(username){
            findAllFollower(req,res);
        }else{
            findAllFollowing(req,res);
        }
    }


    function findIfFollower(req, res) {
        var username = req.query.username;
        var follower = req.query.follower;


        model
            .followerModel
            .findIfFollower(username, follower)
            .then(function (follower) {
                if(follower.length > 0){
                    res.sendStatus(200);
                }else{
                    res.sendStatus(400);
                }

            }, function (error) {
                res.sendStatus(400).send(error);
            });


    }

    function findAllFollower(req, res) {

        var username = req.query.username;

        model
            .followerModel
            .findAllFollower(username)
            .then(function (follower) {
                    res.send(follower);

            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }


    function findAllFollowing(req, res) {


        var follower = req.query.follower;

        model
            .followerModel
            .findAllFollowing(follower)
            .then(function (follower) {
                res.send(follower);

            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function deleteFollower(req, res) {

        var username = req.query.username;
        var follower = req.query.follower;

        model
            .followerModel
            .deleteFollower(username, follower)
            .then(function (status) {
                    res.send(200);

            }, function (error) {
                res.sendStatus(400).send(error);
            });

    }
};