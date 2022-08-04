'use strict';

var express = require('express');
var Excel = require('exceljs');
var resum = require('../../../libs/resumable.js')('./media/uploads/resum');

var moduleModel = require('../models');
var mod_config = {
    module : 'ezbooking',
    resource : 'statistics',
    collection : 'ezbookingsStatistics',
    route : 'ezbooking/statistics',
    view : 'statistics',
    alias : 'statistics'
};

var statistics = express.Router();
statistics.get('/', async function(req, res) {
    var dataView = helpers.admin.get_data_view_admin(req,mod_config);
    try {
        //check permission using display button
        var fields = await moduleModel.get_fields(mod_config,'__v');
        var conditions = helpers.admin.filterQuery(req.query);
        var branch_id = req.session.admin_userdata.branch;
		var restaurant_id = req.session.admin_userdata.restaurant;
		var role = req.session.admin_userdata.role;
        dataView.perms = req.session.admin_userdata.perms;


        dataView.to_date = req.query.to_date;
        dataView.from_date = req.query.from_date;

        var data = {};
        data.total = 0;
        data.approve = 0;
        data.reject = 0;
        data.cancel = 0;
        data.success = 0;
        if (role == 'manager'){
            var i = 0;
            var branch_list = await moduleModel.findAll('ezbookingBranchs', {restaurant_id: restaurant_id});
            dataView.branch_list = branch_list;
            
            for (var branch of branch_list){
                if(branch){
                    conditions['branch_id'] = branch._id;
                    delete conditions['status'];
                    var num_of_user = await moduleModel.distinct('ezbookingOrders','user_id',conditions);
                    branch.num_of_user = num_of_user.length;
                    
                    branch.total = await moduleModel.count('ezbookingOrders', conditions);
                    data.total += branch.total;
                    conditions['status'] = 1;
                    branch.approve = await moduleModel.count('ezbookingOrders', conditions);
                    data.approve += branch.approve;
                    conditions['status'] = 2;
                    branch.reject = await moduleModel.count('ezbookingOrders', conditions);
                    data.reject += branch.reject;
                    conditions['status'] = 3;
                    branch.cancel = await moduleModel.count('ezbookingOrders', conditions);
                    data.cancel += branch.cancel;
                    conditions['status'] = 4;
                    branch.success = await moduleModel.count('ezbookingOrders', conditions);
                    data.success += branch.success;
                }
            }
        }

        dataView.data = data;
        dataView.order_data_per_branch = branch_list;
        dataView.query_get = req.query;

        return res.render('./'+mod_config.module+'/'+mod_config.view+'/list', dataView);
    } catch (e) {
        console.log(e);
        req.flash('msg_error',e.message);
        return res.redirect(_adminUrl);
    }
});

statistics.get('/reportdetail/:_id', async function(req, res) {
    var dataView = helpers.admin.get_data_view_admin(req,mod_config);
    try {
        //check permission using display button
        var fields = await moduleModel.get_fields(mod_config,'__v');
        var conditions = helpers.admin.filterQuery(req.query);
        var branch_id = req.session.admin_userdata.branch;
		var restaurant_id = req.session.admin_userdata.restaurant;
		var role = req.session.admin_userdata.role;
        conditions['branch_id'] = req.params._id;
        var branch_data = await moduleModel.findOne('ezbookingBranchs', {_id:req.params._id});
        var order_data = await moduleModel.findAll('ezbookingOrders', conditions);
        
        dataView.branch_data = branch_data;
        dataView.perms = req.session.admin_userdata.perms;
        dataView.query_get = req.query;
        return res.render('./'+mod_config.module+'/'+mod_config.view+'/reportdetail', dataView);
    } catch (e) {
        console.log(e);
        req.flash('msg_error',e.message);
        return res.redirect(_adminUrl);
    }
});
module.exports = statistics;