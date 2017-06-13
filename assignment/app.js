/**
 * Created by eylamfried on 6/1/17.
 */
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://127.0.0.1:27017/webdev_summer1_2017');

module.exports = function(app) {
    require('./services/user.service.server')(app);
    require('./services/website.service.server')(app);
    require('./services/widget.service.server')(app);
    require('./services/page.service.server')(app);
};

