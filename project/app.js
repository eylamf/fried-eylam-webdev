/**
 * Created by eylamfried on 6/7/17.
 */



module.exports = function (app) {
    require('./services/yelpSearch.service.server')(app);

};
