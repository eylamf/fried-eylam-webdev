/**
 * Created by eylamfried on 6/1/17.
 */

module.exports = function(app) {
    require('./services/user.service.server')(app);
    require('./services/website.service.server')(app);
}

