'use strict';

var express = require('express');
var md5 = require('md5');

var adminModel = require('../models');
var moduleModel = require('../../ezbooking/models');
var dashboard = express.Router();
var mod_config = {
    module : 'ezbooking',
    resource : 'orders',
    collection : 'ezbookingOrders',
    route : 'ezbooking/orders',
    view : 'orders',
    alias : 'orders'
};
dashboard.get('/', async function(req, res) {
    let dataView = helpers.admin.get_data_view_admin(req);
    //assign data
    dataView.lists = [];
    dataView.lists = await moduleModel.find(mod_config.collection);

    return res.render('./admin/dashboard/dashboard', dataView);
});

//get update profile
dashboard.get('/update-profile', async function (req, res) {
    var admin_userdata = req.session.admin_userdata;
    if(admin_userdata == null || typeof admin_userdata === 'undefined'){
        return helpers.base.redirect(res,'admin/login');
    }
    let record = await adminModel.findOne('adminUsers',{'username': admin_userdata.username});
    var dataView = helpers.admin.get_data_view_admin(req);
    dataView.data_edit = dataView.post_data.length > 0 ? dataView.post_data[0] : record;
    return res.render('./admin/dashboard/update_profile', dataView);
});

//post update profile
dashboard.post('/update-profile', async function (req, res) {
    var admin_userdata = req.session.admin_userdata;
    if(admin_userdata == null || typeof admin_userdata === 'undefined'){
        return helpers.base.redirect(res,'admin/login');
    }

    var post_data = req.body;
    req.flash('post_data', post_data);
    var validator = new helpers.validate();
    validator.notEmpty(post_data.fullname,'Họ tên không được bỏ trống');
    var valid_error = validator.hasErrors();
    if(valid_error){
        req.flash('valid_errors',valid_error);
        return helpers.base.redirect(res,'admin/dashboard/update-profile');
    }

    var fullname = helpers.admin.filterXSS(post_data.fullname)
    var updateData = {
        'fullname' : fullname,
        'update_by': helpers.admin.get_update_by(req)
    };

    if(post_data.update_password == 1){
        validator.notEmpty(post_data.old_password,'Nhập mật khẩu cũ');
        validator.isFormatPassword(post_data.new_password,'Mật khẩu phải từ 6-30 ký tự, tối thiểu 1 chữ hoa, 1 chữ thường, 1 chữ số');
        validator.equals(post_data.new_password,post_data.retype_password,'Mật khẩu xác nhận lại không chính xác');
        valid_error = validator.hasErrors();
        if(valid_error){
            req.flash('valid_errors',valid_error);
            return helpers.base.redirect(res,'admin/dashboard/update-profile');
        }

        let user = await adminModel.findOne('adminUsers',{'username': admin_userdata.username});
        if(user){
            var old_password = helpers.admin.hash_password(post_data.old_password);
            if(old_password != user.password) {
                req.flash('valid_errors' , 'Mật khẩu cũ không chính xác.');
                return helpers.base.redirect(res,'admin/dashboard/update-profile');
            }
            updateData.password = helpers.admin.hash_password(post_data.new_password);
        } else {
            req.flash('msg_error' , "User not found.");
            return helpers.base.redirect(res,'');
        }
    }

    var new_avatar = await helpers.file.writeBase64(post_data.new_avatar,'media/avatar');
    if(new_avatar){
        //remove old avatar
        if(admin_userdata.avatar && (admin_userdata.avatar.indexOf('media/avatar') !== -1) ){
            helpers.file.removeFile(admin_userdata.avatar);
        }
        updateData.avatar = new_avatar;
    }

    var conditions = {
        'username': admin_userdata.username
    };

    var update = await adminModel.update('adminUsers', conditions, updateData);
    if(update.status){
        req.flash('msg_success' , "Update profile success");
        req.flash('post_data', null);
        req.session.admin_userdata = null;
        return helpers.base.redirect(res,'admin/login');
    }else{
        req.flash('valid_errors' , update.msg);
    }
    return helpers.base.redirect(res,'admin/dashboard/update-profile');
});

module.exports = dashboard;