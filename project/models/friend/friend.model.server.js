/**
 * Created by eylamfried on 6/24/17.
 */

var mongoose = require('mongoose');
var friendSchema = require('./friend.schema.server');
var friendModel = mongoose.model('FriendModel', friendSchema);

const userModel = require('../user/user.model.server');

module.exports = friendModel;

//friendModel.findAllFriendsForUser = findAllFriendsForUser;

// function findAllFriendsForUser(userId) {
//     return friendModel
//         .find({friends: userId})
//         .populate('friends')
//         .exec();
// }