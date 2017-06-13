/**
 * Created by eylamfried on 6/9/17.
 */
// require mongoose lib for db
var mongoose = require('mongoose');
// create the user schema for objs (prooerties)
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}
});

module.exports = userSchema;
