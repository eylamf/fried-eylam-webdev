/**
 * Created by eylamfried on 6/17/17.
 */

// require mongoose lib for db
var mongoose = require('mongoose');
// create the user schema for objs (prooerties)
var businessSchema = mongoose.Schema({
    _id: String,
    name: String,
    image_url: String,
    location: {type: Object},
    photos: [{type: String}],
    rating: Number,
    review_count: Number,
    price: String,
    url: String,
    phone: {type: String},
    categories: {type: Object},
    _comments: [mongoose.Schema.Types.Object],
    _user: [{type: mongoose.Schema.ObjectId, ref: "UserModel"}]
});

module.exports = businessSchema;