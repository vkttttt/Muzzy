var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var userSchema = new Schema({
    avatar : String,
    username: {
        'type': String,
        'required': true,
        'unique': true,
        'index': true
    },
    fullname: String,
    password: {
        'type': String,
        'required': true
    },
    role: {
        'type': String,
        'default': 'guest'
    },
    restaurant:String,
    branch:String,
    login_incorrect : {
        'type': Number,
        'default': 0
    },
    login_time : {
        'type': Number,
        'default': 0
    },
    status: Boolean,
    update_by: String
},{timestamps:true});

var adminUsers = mongoose.model('adminUsers', userSchema, 'adminUsers'); // model name, schema name, collection name
module.exports = adminUsers;