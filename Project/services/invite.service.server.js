module.exports = function (app,model) {


    app.post("/api/invite", createInvite);
    app.get("/api/invite/:criticName", findAllInvitesByCriticName);
    app.put("/api/invite/:inviteId", updateInvite);
    // app.delete("/api/comment/:commentId", deleteComment);
    // app.put("/api/comment/:commentId", updateReview);

    function updateInvite(req, res) {
        var inviteId = req.params.inviteId;
        var invite =req.body;
        model.inviteModel
            .updateInvite(inviteId, invite)
            .then(
                function(invite){
                    res.json(invite);
                }, function (error) {
                    console.log(error);
                }
            );
    }

    function findAllInvitesByCriticName(req, res) {
        var criticName = req.params.criticName;
        model.inviteModel
            .findInvitesByCriticName(criticName)
            .then(
                function (invites) {
                    res.json(invites);
                }
            )
    }



    function createInvite(req, res) {
        var newInvite = req.body;
        model.inviteModel
            .createInvite(newInvite)
            .then(
                function (newInvite) {
                    res.json(newInvite);
                }, function (error) {
                    res.sendStatus(400).send(error);
                    console.log(error);
                }
            );
    }


}


