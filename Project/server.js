var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var passport      = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');


app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'top secret',
    resave: true,
    saveUninitialized: true}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


require ("./app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);