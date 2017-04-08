module.exports = function (app, model) {

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.use(new LocalStrategy(localStrategy));
    var bcrypt = require("bcrypt-nodejs");
    // var auth = authorized;


    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');

    app.use(session({
        secret: process.env.SESSION_SECRET || 'top secret',
        resave: true,
        saveUninitialized: true}));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get("/api/user",findUser);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/",updateUser);
    app.post("/api/user",createUser);
    app.delete("/api/user/",deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/checkLoggedIn',checkLoggedIn);
    app.post('/api/logout',logout);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/index.html#/user',
            failureRedirect: '/index.html#/login'
        }));
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/index.html#/user',
            failureRedirect: '/index.html#/login'
        }));

    var googleConfig = {
        clientID     : "914499455124-0d4jn9hpden18rgigd7f9j6e3q88tiu5.apps.googleusercontent.com",//process.env.GOOGLE_CLIENT_ID,
        clientSecret : "cCBYplD2WmznaKvTTn7CbPac",//process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : "http://localhost:3000/auth/google/callback"//process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));



    var facebookConfig = {
        clientID     : "1479677212082333",//process.env.FACEBOOK_CLIENT_ID, ////
        clientSecret : "be7bc72af96265506db4ae5faf14a61d",//process.env.FACEBOOK_CLIENT_SECRET,//
        callbackURL  : "http://localhost:3000/auth/facebook/callback"//process.env.FACEBOOK_CALLBACK_URL//
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        model.userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newGoogleUser)
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function localStrategy(username, password, done) {
        model.userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    if(bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    function createUser(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        model.userModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            },
            function (error) {
                console.log(error);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(req, res);
        }
        else if(username){
            findUserByUsername(req, res);
        } else{
            res.json(req.user);
        }
    }

    function findUserByCredentials (req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user){
                        res.json(user);
                    } else{
                        res.json(null);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )

    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user) {
                        res.json(user);
                    } else {
                        res.sendStatus(404);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )

    }

    function findUserById(req,res) {
        var userId = req.params.userId;
        model
            .userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            },
            function (error) {
                res.sendStatus(404);
            })

    }

    function updateUser(req, res) {
        var userId = req.user._id;
        var newUser = req.body;
        model
            .userModel
            .updateUser(userId,newUser)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.user._id;
        model
            .userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error)
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user._doc);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function checkLoggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


}