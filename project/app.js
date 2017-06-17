/**
 * Created by eylamfried on 6/7/17.
 */
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
//mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer1_2017');

var connectionString = 'mongodb://127.0.0.1:27017/webdev_project_summer1_2017';

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds139801.mlab.com:39801/heroku_9hsqv3gp'; // user yours
}

mongoose.connect(connectionString);
module.exports = function (app) {
    require('./services/yelpSearch.service.server')(app);
    require('./services/user.service.server')(app);
};
