/**
 * Created by eylamfried on 6/16/17.
 */

/**
 * Created by eylamfried on 6/9/17.
 */


var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

module.exports = userModel;

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.findUserByUsername = findUserByUsername;

userModel.findAllUsers = findAllUsers;

userModel.addBusiness = addBusiness;

function addBusiness(userId, businessId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.businesses.push(businessId);
            return userModel
                    .updateUser(userId, user);


        });
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {
        // choose what the user can update
        $set : newUser
    });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}


