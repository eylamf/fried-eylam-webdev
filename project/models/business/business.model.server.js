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

businessModel.findAllBusinessesForUser = findAllBusinessesForUser;
businessModel.createBusiness = createBusiness;
businessModel.findBusinessesById = findBusinessById;

function findAllBusinessesForUser(userId) {
    return businessModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function createBusiness(userId, business) {
    business._user = userId;
    business._id = business.id;
    return businessModel
        .create(business)
        .then(function (business) {
            userModel
                .addBusiness(userId, business._id);
        });

}

function findBusinessById(businessId) {
    businessModel.findById(businessId);
}






