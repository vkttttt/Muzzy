'use strict';

var express = require('express');
var Excel = require('exceljs');
var resum = require('../../../libs/resumable.js')('./media/uploads/resum');

var adminModel = require('../models');
var mod_config = {
	module : 'admin',
	resource : 'menus',
	collection : 'adminMenus',
	route : 'admin/menus',
	view : 'menus',
	alias : 'Menus'
};

var menus = express.Router();
menus.get('/', async function(req, res) {
	try {
		var page = parseInt(req.query.page);
		if(isNaN(page) || page <= 0) page = 1;
		var dataView = helpers.admin.get_data_view_admin(req,mod_config);
		var fields = await adminModel.get_fields(mod_config,'__v update_by');

		var conditions = helpers.admin.filterQuery(req.query, fields);
		var query_string = helpers.admin.build_query(req.query);
		var limit = appConfig.grid_limit;
		var skip = limit * (page - 1);
		var sort = { createdAt: -1 };
		var select = Object.keys(fields).join(' ');

		var query_link = _baseUrl + mod_config.route + '?' + query_string;
		var totals = await adminModel.count(mod_config.collection,conditions);
		var paginator = helpers.admin.pagination(query_link,page,totals,limit);

		//get data
		dataView.lists = (totals > 0) ? await adminModel.find(mod_config.collection,conditions,select,sort,limit,skip) : [];

		//check permission using display button
		dataView.perms = req.session.admin_userdata.perms;
		dataView.fields = fields;
		dataView.output_paging = paginator.render();
		dataView.total_record = totals;
		dataView.query_get = req.query;
		dataView.query_string = query_string;
		return res.render('./'+mod_config.module+'/'+mod_config.resource+'/list', dataView);
	} catch (e) {
		console.log(e);
		req.flash('msg_error','Error: '+e.message);
		return res.redirect(_adminUrl);
	}
});

//Get add
menus.get('/add', async function(req, res){
	try {
		var dataView = helpers.admin.get_data_view_admin(req,mod_config);
		dataView.fields = await adminModel.get_fields(mod_config,'__v update_by');
		dataView.parents = await adminModel.findAll(mod_config.collection,{link:"#"},'name');
		res.render('./'+mod_config.module+'/'+mod_config.view+'/add', dataView);
	} catch (e) {
		console.log(e);
		req.flash('msg_error',e.message);
		return helpers.base.redirect(res,mod_config.route);
	}
});

//Post add
menus.post('/add', async function(req, res){
	try {
		var post_data = req.body;
		req.flash('post_data',post_data);
		//validate
		var validator = new helpers.validate();
		validator.checkBody('name','notEmpty',req).checkBody('link','notEmpty',req).checkBody('weight','isNumeric',req);
		if(post_data.is_dashboard) validator.checkBody('is_dashboard','isBoolean',req);
		if(post_data.status) validator.checkBody('status','isBoolean',req);

		var valid_error = validator.hasErrors();
		if(valid_error){
			req.flash('valid_errors',valid_error);
			return helpers.base.redirect(res,mod_config.route+'/add');
		}

		//check exists
		var record = await adminModel.findOne(mod_config.collection,{'link': {$eq:post_data.link.trim(),$ne:'#'}});
		if(record){
			req.flash('msg_error','link already exist');
			return helpers.base.redirect(res,mod_config.route+'/add');
		}

		//filter data
		let dataAdd = await adminModel.filterData(mod_config.collection,post_data,'__v');
		dataAdd.update_by = helpers.admin.get_update_by(req);

		//create
		let create = await adminModel.create(mod_config.collection, dataAdd, true);
		if(create.status){
			req.flash('msg_success','Add success');
			return helpers.base.redirect(res,mod_config.route);
		} else {
			req.flash('msg_error',create.msg);
			return helpers.base.redirect(res,mod_config.route+'/add');
		}
	} catch(e) {
		console.log(e);
		req.flash('msg_error',e.message);
		return helpers.base.redirect(res,mod_config.route+'/add');
	}
});

//Get edit
menus.get('/edit/:id', async function (req, res) {
	try {
		//validate ID
		var validator = new helpers.validate();
		var valid_error = validator.isObjectId(req.params.id,'Invalid ID').hasErrors();
		if(valid_error){
			req.flash('msg_error',valid_error[0]);
			return helpers.base.redirect(res,mod_config.route);
		}

		var dataView = helpers.admin.get_data_view_admin(req,mod_config);
		var record = await adminModel.findOne(mod_config.collection,{'_id':req.params.id});
		if (record) {
			dataView.fields = await adminModel.get_fields(mod_config,'__v update_by');
			dataView.data_edit = dataView.post_data.length > 0 ? dataView.post_data :record;
			dataView.parents = await adminModel.findAll(mod_config.collection,{link:"#"},'name');
			return res.render('./'+mod_config.module+'/'+mod_config.view+'/edit', dataView);
		}else{
			req.flash('msg_error', 'Data null');
			return helpers.base.redirect(res,mod_config.route);
		}
	} catch(e){
		console.log(e);
		req.flash('msg_error',e.message);
		return helpers.base.redirect(res,mod_config.route);
	}
});

//post edit
menus.post('/edit/:id', async function (req, res) {
	try {
		var post_data = req.body;
		req.flash('post_data',post_data);

		//validate
		var validator = new helpers.validate();
		validator.checkBody('name','notEmpty',req).checkBody('link','notEmpty',req).checkBody('weight','isNumeric',req);
		if(post_data.status) validator.checkBody('status','isBoolean',req);
		if(post_data.is_dashboard) validator.checkBody('is_dashboard','isBoolean',req);

		var valid_error = validator.hasErrors();
		if(valid_error){
			req.flash('valid_errors',valid_error);
			return helpers.base.redirect(res,mod_config.route+'/edit/'+req.params.id);
		}

		if(post_data._id != req.params.id){
			req.flash('msg_error','Invalid ID');
			return helpers.base.redirect(res,mod_config.route);
		}

		//check exists
		var record = await adminModel.findOne(mod_config.collection,{'link': {$eq:post_data.link.trim(),$ne:'#'},_id : {$not:{$eq:post_data._id}}});
		if(record){
			req.flash('msg_error','link already exist');
			return helpers.base.redirect(res,mod_config.route+'/add');
		}

		//filter data
		var dataUpdate = await adminModel.filterData(mod_config.collection,post_data,'__v _id');
		dataUpdate.update_by = helpers.admin.get_update_by(req);

		var update = await adminModel.update(mod_config.collection, {'_id': req.params.id}, dataUpdate, true);
		if(update.status){
			req.flash('msg_success','Edit success.');
			return helpers.base.redirect(res,mod_config.route);
		} else {
			req.flash('msg_error',update.msg);
			return helpers.base.redirect(res,mod_config.route+'/edit/'+req.params.id);
		}

	} catch(e) {
		console.log(e);
		req.flash('msg_error',e.message);
		return helpers.base.redirect(res,mod_config.route);
	}
});

//GET import
menus.get('/import', function(req, res){
    try {
        var dataView = helpers.admin.get_data_view_admin(req,mod_config);
        res.render('./layout/partial/import', dataView);
    } catch (e) {
        console.log(e);
        req.flash('msg_error',e.message);
        return helpers.base.redirect(res,mod_config.route);
    }
});

/** POST import
 *
 */
menus.post('/import', function(req, res){
    try {
        var total = req.body.resumableTotalChunks;
        var num = req.body.resumableChunkNumber;
        resum.post(req, function (status, filename, original_filename, identifier, numberOfChunks) {
            if ('done' == status && num == total) {
                req.session.upload_finish = true;
                var ext = filename.split('.').pop();
                filename = helpers.hash.md5(filename.replace(/[^0-9a-zA-Z_-]/img, ''));
                var file_path = _basepath+'media/import/'+filename+'.'+ext;
                resum.write(identifier, file_path, async function(result){
                    if(result){
                        resum.clean(identifier);
                        var import_data = await helpers.admin.import_data(file_path, mod_config);
                        import_data.status = 'import_finished';
                        res.json(import_data);
                    } else {
                        res.json({status: 'write_false'});
                    }
                });
            } else {
                res.json({ status: status });
            }
        });
    } catch (e) {
        console.log(e);
        res.json({status:e.message});
    }
});

//GET export
menus.get('/export', async function(req, res){
	try {
		var fields = await adminModel.get_fields(mod_config,'__v');
		var field_keys = Object.keys(fields);
        var dataView = helpers.admin.get_data_view_admin(req, mod_config);
        dataView.field_keys = field_keys;
        dataView.fields = fields;
        res.render('./layout/partial/export', dataView);
    } catch (e) {
        console.log(e);
        req.flash('msg_error', e.message);
        return helpers.base.redirect(res, mod_config.route);
    }
});

//POST Export
menus.post('/export', async function(req, res){
	try {
        var data_post = JSON.parse(req.body.data);
		var field_keys_export = Object.keys(data_post);
		if(field_keys_export.length == 0) return res.json({status : 'error', msg : 'Select column'});

		var fields = await adminModel.get_fields(mod_config,'__v');
		var field_keys = [];
		for(let i = 0;i < field_keys_export.length;i++){
			if(fields[field_keys_export[i]] != undefined) field_keys.push(field_keys_export[i]);
		}
		if(field_keys.length == 0) return res.json({status : 'error', msg : 'Invalid field'});

		var arr_header = [];
		for(let i = 0;i < field_keys.length;i++){
			var item = { header: field_keys[i], key : field_keys[i], width : 50 };
			arr_header.push(item);
		}

		var timeBegin = new Date().getTime();
		var file_name = mod_config.resource+'_'+timeBegin+'.xlsx';
		var tempFilePath = _basepath+'media/export/'+file_name;

		await helpers.file.createFolder(_basepath+'media/export');

		const workbook = new Excel.stream.xlsx.WorkbookWriter({filename:tempFilePath});
		var worksheet = null;
		var num = 0;
		const MAX_RECORD = 1000000;

		//first
		worksheet = workbook.addWorksheet('Report Sheet ' + Math.ceil(num / MAX_RECORD));
		worksheet.columns = arr_header;
		worksheet.state = 'visible';

		var conditions = helpers.admin.buildQuery(data_post, fields);
		var stream = await adminModel.get_stream(mod_config.collection, conditions);

		stream.on('error', (e) => {
			console.log(e);
			return res.json({status : 'error', msg : e.message});
		});

		stream.on('data', (data) => {
			var item = {};
			for (let j = 0; j < field_keys.length; j++) {
				let field_type = fields[field_keys[j]];
            	item[field_keys[j]] = helpers.admin.convertDataExport(data[field_keys[j]],field_type);
			}

			if (num != 0 && (num % MAX_RECORD) === 0) {
				worksheet = workbook.addWorksheet('Report Sheet ' + Math.ceil(num / MAX_RECORD));
				worksheet.columns = arr_header;
				worksheet.state = 'visible';
			}

			num++;
			worksheet.addRow(item).commit();
		});

		stream.on('end', () => {
			workbook.commit().then(() => {
				return res.json({status : 'success', path : _staticUrl+'media/export/'+file_name});
			}).catch((e) => {
				console.log(e);
				return res.json({status : 'error', msg : e.message});
			});
		});
    } catch (e) {
        console.log(e);
        req.flash('msg_error' , e.message);
        return helpers.base.redirect(res,mod_config.route);
    }
});

//delete
menus.post('/delete', async function (req, res) {
	var post_data = req.body;
	if(post_data != null && !post_data.listViewId){
		req.flash('msg_error','Delete error.');
		return helpers.base.redirect(res,mod_config.route);
	}

	try	{
		var condition = { _id: { $in: post_data.listViewId } };
		var del = await adminModel.deleteMany(mod_config.collection,condition);
		if(del.status){
			req.flash('msg_success' , "Delete success.");
		}else{
			req.flash('msg_error' , "Delete fail.");
		}
		return helpers.base.redirect(res,mod_config.route);
	} catch(e){
		console.log(e);
		req.flash('msg_error' , e.message);
		return helpers.base.redirect(res,mod_config.route);
	}
});

//Get detail
menus.get('/detail/:_id', async function(req, res){
    try {
        //validate
        var validator = new helpers.validate();
        var valid_error = validator.isObjectId(req.params._id,'ID must be ObjectID').hasErrors();
        if(valid_error){
            req.flash('msg_error',valid_error);
            return helpers.base.redirect(res,mod_config.route);
        }

        var dataView = helpers.admin.get_data_view_admin(req,mod_config);
        var record = await adminModel.findOne(mod_config.collection,{'_id':req.params._id});
        if (record) {
            dataView.fields = await adminModel.get_fields(mod_config, '__v');
            dataView.data_detail = dataView.post_data.length > 0 ? dataView.post_data :record;
            res.render('./layout/partial/view', dataView);
        }else{
            req.flash('msg_error', 'Data null');
            return helpers.base.redirect(res,mod_config.route);
        }
    } catch(e) {
        req.flash('msg_error',e.message);
        return helpers.base.redirect(res,mod_config.route);
    }
});

module.exports = menus;