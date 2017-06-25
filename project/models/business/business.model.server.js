/**
 * Created by eylamfried on 6/16/17.
 */


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
            console.log('found business: ' + business);
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
    /*business._id = business.id;

    var businessExists = businessModel.findById(business._id);
    var userHasBusiness = userModel.findBusinessById(business._id).data;
    var businessHasUser = businessModel.findUserById(userId, business).data;

    console.log('business exists: ' + businessExists);
    console.log('user has business: ' + userHasBusiness);
    console.log('business has user: ' + businessHasUser);


    if (businessExists && userHasBusiness && businessHasUser) {
        // remove it
        console.log('should remove here');
    } else if (businessExists && !userHasBusiness && !businessHasUser) {
        console.log('business exists but other 2 do not');
        // add the user to this business, and add business to the user
        return businessModel
            .addUser(userId, business)
            .then(function (status) {
                userModel
                    .addBusiness(userId, business._id);
            });
    } else if (!businessExists) {
        console.log('creating the business');
        business._id = business.id;
        return businessModel
            .create(business)
            .then(function (newbusiness) {
                userModel
                    .addBusiness(userId, newbusiness._id)
                    .then(function (response) {
                        businessModel
                            .addUser(userId, newbusiness);
                    });
            });
    }*/

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
        })

    /*business._id = business.id;
    // check to see if there is already a business like this and if this user already has it in their list of businesses
    var b_found = businessModel.findById(business._id);
    var u_found = userModel.findBusinessById(userId, business._id).data;
    console.log('b_found ' + b_found);
    console.log('u_found ' + u_found);
    // if there is a business and the user already liked it but clicks the 'heart' again, unlike/remove
    if (b_found && u_found) {
        console.log('found found');
        // return userModel
        //     .removeBusiness(userId, business)
        //     .then(function (response) {
        //         businessModel
        //             .removeUser(userId, business);
        //     });
    }
    // if there is a business like this but the user has not liked it and now did, add it to their list
    // and add the user to the business list
    else if (b_found && !u_found) {
        console.log('bfound but not u');
        return userModel
            .addBusiness(userId, business._id)
            .then(function (response) {
                businessModel
                    .addUser(userId, business);
            });
    }
    //
    else if (!b_found && !u_found) {
        console.log('not u or b');
        business._user = userId;
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
            })
    }*/
}

function findBusinessById(businessId) {
    return businessModel.findById(businessId);
}






// /**
//  * Created by eylamfried on 6/9/17.
//  */
//
//
// var mongoose = require('mongoose');
// var businessSchema = require('./business.schema.server');
// var businessModel = mongoose.model('BusinessModel', businessSchema);
//
// const userModel = require('../user/user.model.server');
//
// module.exports = businessModel;
//
// businessModel.findAllBusinessesForUser = findAllBusinessesForUser;
// businessModel.createBusiness = createBusiness;
// businessModel.findBusinessesById = findBusinessById;
// businessModel.addUser = addUser;
// businessModel.removeUser = removeUser;
// businessModel.updateBusiness = updateBusiness;
//
// function addUser(userId, business) {
//     return businessModel
//         .findById(business._id)
//         .then(function (business) {
//             business._user.push(userId);
//             return businessModel
//                 .updateBusiness(business);
//         });
// }
//
// function updateBusiness(business) {
//     console.log(business._user);
//     return businessModel.update({_id: business._id}, {
//         $set : {
//             _user: business._user
//         }
//     });
// }
//
// function removeUser(userId, business) {
//     return businessModel
//         .findById(business._id)
//         .then(function (business) {
//             business._user.remove(userId);
//             return business.save();
//         });
// }
//
// function findAllBusinessesForUser(userId) {
//     return businessModel
//         .find({_user: userId})
//         .populate('_user')
//         .exec();
// }
//
// function createBusiness(userId, business) {
//     business._id = business.id;
//     // check to see if there is already a business like this and if this user already has it in their list of businesses
//     var b_found = businessModel.findById(business._id);
//     var u_found = userModel.findBusinessById(userId, business._id).data;
//     console.log('b_found ' + b_found);
//     console.log('u_found ' + u_found);
//     // if there is a business and the user already liked it but clicks the 'heart' again, unlike/remove
//     if (b_found && u_found) {
//         console.log('found found');
//         // return userModel
//         //     .removeBusiness(userId, business)
//         //     .then(function (response) {
//         //         businessModel
//         //             .removeUser(userId, business);
//         //     });
//     }
//     // if there is a business like this but the user has not liked it and now did, add it to their list
//     // and add the user to the business list
//     else if (b_found && !u_found) {
//         console.log('bfound but not u');
//         return userModel
//             .addBusiness(userId, business._id)
//             .then(function (response) {
//                 businessModel
//                     .addUser(userId, business);
//             });
//     }
//     //
//     else if (!b_found && !u_found) {
//         console.log('not u or b');
//         business._user = userId;
//         business._id = business.id;
//         return businessModel
//             .create(business)
//             .then(function (business) {
//                 userModel
//                     .addBusiness(userId, business._id);
//             })
//     }
//
//     // business._user = userId;
//     // business._id = business.id;
//     // return businessModel
//     //     .create(business)
//     //     .then(function (business) {
//     //         userModel
//     //             .addBusiness(userId, business._id);
//     //     });
//
// }
//
// function findBusinessById(businessId) {
//     businessModel.findById(businessId);
// }






