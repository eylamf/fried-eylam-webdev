var express = require('express');
var app = express();

// load parser lib
var bodyParser = require('body-parser');
// hw 6
var cookieParser = require('cookie-parser');
var session = require('express-session');

var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: "this is my secret",
    resave: true,
    saveUninitialized: true
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/session', function (req, res) {
    res.send(req.session);
});

app.get('/api/session/:name/:value', function (req, res) {
    var name = req.params.name;
    var value = req.params.value;
    req.session[name] = value;
    res.send(req.session);
});

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// to-do - uncomment for hw 1 - testing server
//require ("./test/app.js")(app);

// for to-do app
/*var myApp = require('./lectures/app');
myApp(app);*/

var port = process.env.PORT || 3000;

// hw3 load app
require ("./assignment/app.js")(app);

//////////////////////////////////////////////* PROJECT */

// require("./project/app")(app);


app.listen(port);
