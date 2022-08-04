
var express = require('express');
var registerRoute = express.Router();
var Joi = require('joi');
var passport = require('passport');
var ezbookingModel = require('../ezbooking/models');
var mod_config = {
    module : 'ezbooking',
    resource : 'users',
    collection : 'ezbookingUsers',
    route : 'ezbooking/users',
    view : 'users',
    alias : 'users'
};


var mdw = (function (req, res, next) {
	var flag = true;
	if(typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined' || req.body.username.trim() == '' || req.body.password.trim() == ''){
		req.flash('msg_error', 'Username or Password must be not null');
		flag = false;
	}

	return flag ? next() : helpers.base.redirect(res,'register');
});


registerRoute.get('/', function (req, res) {
	if(req.session.userdata){
		return helpers.base.redirect(res,'profile');
	}

	let dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);

	return res.render('./frontend/register', dataView);
});

//post register
registerRoute.post('/', async function(req, res) {
	req.flash('post_data', req.body);
	//var captcha = await helpers.admin.check_recaptcha(req.body['g-recaptcha-response']);
	//if(captcha && captcha.success){
		var username = req.body.username;
		var password = req.body.password;
		var h_password = helpers.admin.hash_password(password);
		var email = req.body.email;
		var phone = req.body.phone;
		var fullname = req.body.fullname;
		var userdata = {
			"username": username,
			"password": h_password,
			"login_from": "",
			"fullname": fullname,
			"avatar": "public/admin/images/avatar/default.jpg",
			"gender": "",
			"birth_day": "",
			"phone": phone,
			"email": email,
			"level": 0,
			"point": 0,
			"voucher_wallet": [],
			"status": true
		}
		var validator = new helpers.validate();
		validator.isFormatUsername(username,'Username incorrect');
		validator.isFormatPassword(password,'Password incorrect');
		var errors = validator.hasErrors();
		if(errors && errors.length > 0){
			req.flash('msg_error', errors);
		} else {
			let where = {'username': username};
			var user = await ezbookingModel.findOne('ezbookingUsers',where);
			if(user){
				req.flash('msg_error', 'Username has existed');
			}
			else{
				console.log("register");
				await ezbookingModel.create('ezbookingUsers',userdata);
				//set data login to session
				helpers.log.tracking(req);
				req.flash('msg_success', 'Register success');
			}	
		}
	//} 
  //else {
		//req.flash('msg_error', 'Please confirm you are not robot !');
	//}
	return helpers.base.redirect(res,'login');
});


module.exports = registerRoute;