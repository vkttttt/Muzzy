var express = require("express");
var adminModel = require('../admin/models');
var tool = express();
var fs = require('fs');
// tool.use('/notification', require('./notification'));

fs.readdirSync(__dirname).filter(function (file, index) {
    return file !== 'index.js';
}).forEach(function (module) {
    try {
        let moduleLoad = module.slice(0, module.indexOf('.js'));
        tool.use('/' + moduleLoad, require('./' + moduleLoad));
    } catch (e) {
        console.log(e);
    }
});

tool.valid = function (req, res, next) {
	var admin_userdata = req.session.admin_userdata;
	if (typeof admin_userdata === 'undefined' || admin_userdata === null) {
		return res.json({ status: "Forbidden" });
	}
	return next();
};

tool.get('/', tool.valid, function (req, res) {
	tool.set('views', _basepath + 'app/views');
	res.render('tool/index', null);
});

module.exports = tool;