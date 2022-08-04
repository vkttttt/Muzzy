let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
// create a schema
let objSchema = new Schema({
	googleId: String,
	username:{
        'type': String,
        'required': true,
        'unique': true,
        'index': true
    },
	password:{
        'type': String,
        'required': true
    },
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	login_from:String,
	fullname:String,
	avatar:String,
	gender:String,
	birth_day:String,
	phone:String,
	email:String,
	address:String,
	level:String,
	point:String,
	voucher_wallet:Array,
	login_incorrect : {
        'type': Number,
        'default': 0
    },
    login_time : {
        'type': Number,
        'default': 0
    },
	status:Boolean,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingUsers',objSchema,'ezbookingUsers'); // model name, schema name, collection name
