var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// to-do - uncomment for hw 1 - testing server
require ("./test/app.js")(app);

// for to-do app
/*var myApp = require('./lectures/app');
myApp(app);*/

var port = process.env.PORT || 3000;

app.listen(port);
