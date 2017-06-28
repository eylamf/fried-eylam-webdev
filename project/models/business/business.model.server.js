/**
 * Created by eylamfried on 6/16/17.
 */


/**
 * Created by eylamfried on 6/9/17.
 */


var mongoose = require('mongoose');

var businessSchema = require('./business.schema.server');
var businessModel = mongoose.model('BusinessModel', businessSchema);

const userModel = require('../user/user.model.server');

module.exports = businessModel;

businessModel.findAllBusinessesForUser = findAllBusinessesForUser;
businessModel.createBusiness = createBusiness;
businessModel.findBusinessById = findBusinessById;
businessModel.addUser = addUser;
businessModel.removeUser = removeUser;
businessModel.findUserById = findUserById;
businessModel.updateBusiness = updateBusiness;
businessModel.createComment = createComment;


function createComment(businessId, comment) {
    return businessModel
        .findById(businessId)
        .then(function (business) {
            business._comments.push(comment);
            return business.save();
        });
}

function addUser(userId, business) {
    return businessModel
        .findById(business._id)
        .then(function (business) {
            business._user.push(userId);
            return businessModel
                .updateBusiness(business);
        });
}

function updateBusiness(business) {
    console.log(business._user);
    return businessModel.update({_id: business._id}, {
        $set : business
    });
}

function removeUser(userId, business) {
    return businessModel
        .findById(business._id)
        .then(function (business) {
            business._user.remove(userId);
            return business.save();
        });
}

function findAllBusinessesForUser(userId) {
    return userModel
        .find({_id: userId})
        .populate('businesses')
        .exec();
}

function findUserById(userId, business) {
    return businessModel
        .findById(business._id)
        .then(function (business) {
            return business._user.indexOf(userId);
        });
}

function createBusiness(userId, business) {

    // return businessModel
    //     .findById(business.id)
    //     .then(function (business) {
    //         console.log('found: ' + business.name)
    //         // if the business exists but the user does NOT have it yet
    //         if ((business !== null || typeof business !== 'undefined' || business)
    //             && !(business._user.indexOf(userId) > -1)) {
    //             console.log('does NOT have');
    //             userModel
    //                 .findUserById(userId)
    //                 .then(function (user) {
    //                     user.businesses.push(business._id);
    //                     userModel.updateUser(userId, user);
    //                     // not sure about these next two lines of code, might need to return the above line
    //                     business._user.push(userId);
    //                     return businessModel.updateBusiness(business._id);
    //                 });
    //         }
    //
    //         // this business already exists and the user DOES have it
    //          else if ((business !== null || typeof business !== 'undefined' || business)
    //             && business._user.indexOf(userId) > -1) {
    //             console.log('DOES have');
    //             userModel
    //                 .findUserById(userId)
    //                 .then(function (user) {
    //                     var index = user.businesses.indexOf(business._id);
    //                     user.businesses.splice(index, 1);
    //                     userModel.updateUser(userId, user);
    //                     // not sure about these next two lines of code, might need to return the above line
    //                     var userIndex = business._user.indexOf(userId);
    //                     business.splice(userIndex, 1);
    //                     return businessModel.updateBusiness(business);
    //                 });
    //         }
    //         // if the business does not exist
    //         else if (business === null || typeof business === 'undefined') {
    //             console.log('create new');
    //             business._id = business.id;
    //             return businessModel.create(business);
    //         }
    //     });



    // business._id = business.id;
    //
    // var businessExists = businessModel.findById(business._id);
    // var userHasBusiness = userModel.findBusinessById(business._id).data;
    // var businessHasUser = businessModel.findUserById(userId, business).data;
    //
    // console.log('business exists: ' + businessExists);
    // console.log('user has business: ' + userHasBusiness);
    // console.log('business has user: ' + businessHasUser);
    //
    //
    // if (businessExists && userHasBusiness && businessHasUser) {
    //     // remove it
    //     console.log('should remove here');
    // } else if (businessExists && !userHasBusiness && !businessHasUser) {
    //     console.log('business exists but other 2 do not');
    //     // add the user to this business, and add business to the user
    //     return businessModel
    //         .addUser(userId, business)
    //         .then(function (status) {
    //             userModel
    //                 .addBusiness(userId, business._id);
    //         });
    // } else if (!businessExists) {
    //     console.log('creating the business');
    //     business._id = business.id;
    //     return businessModel
    //         .create(business)
    //         .then(function (newbusiness) {
    //             userModel
    //                 .addBusiness(userId, newbusiness._id)
    //                 .then(function (response) {
    //                     businessModel
    //                         .addUser(userId, newbusiness);
    //                 });
    //         });
    // }

    //business._user = userId;



    business._id = business.id;
    return businessModel
        .create(business)
        .then(function (business) {
            userModel
                .addBusiness(userId, business._id)
                .then(function (response) {
                    businessModel
                        .addUser(userId, business);
                });
        });


}

function findBusinessById(businessId) {
    return businessModel.findById(businessId);
}









