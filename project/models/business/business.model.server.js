/**
 * Created by eylamfried on 6/16/17.
 */

/**
 * Created by eylamfried on 6/9/17.
 */


var mongoose = require('mongoose');
var businessSchema = require('./business.schema.server');
var businessModel = mongoose.model('BusinessModel', businessSchema);

module.exports = businessModel;

businessModel.findBusinessesByUserId = findBusinessById;
businessModel.createBusiness = createBusiness;

function createBusiness(userId, business) {
    business._user = userId;
    business._id = business.id;
    return businessModel
        .create(business);
        // .then(function (business) {
        //     userModel
        //         .addBusiness(userId, business);
        // });

}

function findBusinessById(businessId) {
    businessModel.findById(businessId);
}






