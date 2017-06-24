/**
 * Created by eylamfried on 6/24/17.
 */

module.exports = function(app) {
    var businessModel = require('../models/business/business.model.server');

    app.post('/api/project/user/:userId', createBusiness);

    function createBusiness(req, res) {
        var business = req.body;
        var userId = req.user._id;

        businessModel
            .createBusiness(userId, business)
            .then(function (business) {
                res.json(business);
            });
    }
};