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
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;

function findAllUsers() {
    return userModel.find();
}

function addWebsite(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            console.log('this is user: ' + user);
            user.websites.push(websiteId);
            return user.save();
        });
}

function deleteWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}
// userModel.FUNCTION is built into mongoose

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {
        // choose what the user can update
        $set : {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
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


