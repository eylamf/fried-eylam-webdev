/**
 * Created by eylamfried on 6/17/17.
 */

// require mongoose lib for db
var mongoose = require('mongoose');
// create the user schema for objs (prooerties)
var businessSchema = mongoose.Schema({
    name: String,
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"}
});

module.exports = businessSchema;