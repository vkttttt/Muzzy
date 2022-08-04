var express = require("express");

var adminModel = require('../admin/models');

var admin = express();

admin.set('views',_basepath+'app/views');

admin.use('/uploadfile', require('./routes/upload/upload'));
//============================= LOAD RESOURCES ===================================//
adminModel.findAll('adminResources',{module:'admin'}, 'name', {},function(result){
	result.forEach(function(resource){
		admin.use('/'+resource.name,helpers.admin.authAdmin, require('./routes/'+resource.name));
	});
});
//================================ END RESOURCES =================================//

var mdw = (function (req, res, next) {
	var flag = true;
	if(typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined' || req.body.username.trim() == '' || req.body.password.trim() == ''){
		req.flash('msg_error', 'Username or Password must be not null');
		flag = false;
	}

	return flag ? next() : helpers.base.redirect(res,'admin/login');
});

admin.get('/', function (req, res) {
	return helpers.base.redirect(res,'admin/dashboard');
});

admin.get('/logout', function (req, res) {
	req.session.admin_userdata = null;
	return helpers.base.redirect( res, 'admin/login');
});

admin.get('/no_permission', function (req, res) {
	if(req.session.admin_userdata){
		let dataView = helpers.admin.get_data_view_admin(req);
		return res.render('./admin/no_permission', dataView);
	} else {
		return helpers.base.redirect(res,'admin/login');
	}
});

//login page
admin.get('/login', function (req, res) {
	if(req.session.admin_userdata){
		return helpers.base.redirect(res,'admin/dashboard');
	}

	let dataView = helpers.admin.get_data_view_admin(req);

	res.render('./admin/login', dataView);
});

//post login
admin.post('/login', async function(req, res) {
	req.flash('post_data', req.body);
	//var captcha = await helpers.admin.check_recaptcha(req.body['g-recaptcha-response']);
	//if(captcha && captcha.success){
	if(true){
		var username = req.body.username;
		var password = req.body.password;
		var validator = new helpers.validate();
		validator.isFormatUsername(username,'Username incorrect');
		validator.isFormatPassword(password,'Password incorrect');
		var errors = validator.hasErrors();
		if(errors && errors.length > 0){
			req.flash('msg_error', errors);
		} else {
			let where = {'username': username};
			var user = await adminModel.findOne('adminUsers',where);
			if(user) {
				var otime = new Date();
				if(user.login_incorrect >= appConfig.login.incorrect){
					var time_block = user.login_time;
					var current_time = otime.getTime();
					var remand_time = current_time - time_block;
					if(remand_time >= appConfig.login.block_time){
						//reset time block
						await adminModel.update('adminUsers',where,{login_incorrect:0,login_time:0});
					} else {
						//blocking
						req.flash('msg_error', 'Account is blocking');
						return helpers.base.redirect(res,'admin/login');
					}
				}

				//check password
				var h_password = helpers.admin.hash_password(password);
				if(user.password == h_password){
					if(user.status === true){
						//get permission
						var permissions = [];
						if(user.role != 'root'){
							permissions = await adminModel.findAll('adminPermissions',{'role' : user.role},'-_id role module resource permissions');
						}

						//set data login to session
						req.session.admin_userdata = {
							user_id : user._id,
							username : user.username,
							fullname : user.fullname,
							role : user.role,							
							restaurant: user.restaurant,
							branch: user.branch,
							phone : user.phone,
							avatar : user.avatar,
							list_perms : permissions
						};

						await adminModel.update('adminUsers',where,{login_incorrect:0,login_time:otime.getTime()});
						req.session.admin_menu = await helpers.admin.menus(user.role);
						helpers.log.tracking(req);
						req.flash('msg_success', 'Login success');
					} else {
						req.flash('msg_error', 'Account is disable');
					}
				} else {
					await adminModel.update('adminUsers',where,{$inc:{login_incorrect:1},login_time:otime.getTime()});
					req.flash('msg_error', 'Account or Password incorrect');
				}
			} else {
				req.flash('msg_error', 'Account or Password incorrect');
			}
		}
	} else {
		req.flash('msg_error', 'Please confirm you are not robot !');
	}
	return helpers.base.redirect(res,'admin/login');
});

module.exports = admin;
