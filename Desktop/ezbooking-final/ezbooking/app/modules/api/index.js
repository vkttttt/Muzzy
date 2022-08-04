var express = require("express");
var adminModel = require('../admin/models');
var api = express();



api.use('/tool', require('./tool'));
api.use('/ezbooking', require('./ezbooking'));

api.valid = function (req, res, next) {
	var admin_userdata = req.session.admin_userdata;
	if (typeof admin_userdata === 'undefined' || admin_userdata === null) {
		return res.json({ status: "Forbidden" });
	}
	return next();
};

api.get('/', api.valid, function (req, res) {
	res.send('API');
});

api.post('/apply_setting', api.valid, function (req, res) {
	req.session.menu_layout = req.body._menu;
	req.session.language = req.body._language;
	return res.json({ 'status': 1 });
});

api.post('/get_resource_by_module', api.valid, async function (req, res) {
	var module_name = req.body.module;
	var resources = await adminModel.findAll('adminResources', { module: module_name }, '-_id name');
	if (resources) {
		return res.json({ status: 1, data: resources });
	}
	return res.json({ status: 0, data: 'Module don\'t have resources' });
});

api.post('/get_fields_by_resource', api.valid, async function (req, res) {
	var module_name = req.body.module;
	var resource_name = req.body.resource;
	var collection = await adminModel.findOne('adminResources', { name: resource_name, module: module_name }, '-_id collection_name');
	if (collection && collection.collection_name) {
		var mod_config = {
			module: module_name,
			resource: resource_name,
			collection: collection.collection_name
		};
		var moduleModel = require('../' + module_name + '/models');
		var fields = await moduleModel.get_fields(mod_config);
		return res.json({ status: 1, data: Object.keys(fields) });
	}
	return res.json({ status: 0, data: 'Resource don\'t have collection' });
});

module.exports = api;
