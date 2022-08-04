'use strict';

var express = require('express');
var Excel = require('exceljs');
var resum = require('../../../libs/resumable.js')('./media/uploads/resum');

var users = express.Router();

var adminModel = require('../models');
//var ezbookingModel = require('../../ezbooking/models');
var mod_config = {
	module: 'admin',
	resource : 'users',
	collection : 'adminUsers',
	route : 'admin/users',
	view : 'users',
	alias : 'Users'
};

users.get('/', async function(req, res) {
	try {
		var page = parseInt(req.query.page);
		if(isNaN(page) || page <= 0) page = 1;

		var dataView = helpers.admin.get_data_view_admin(req,mod_config);
		var fields = await adminModel.get_fields(mod_config,'__v update_by',dataView.role);
		var conditions = helpers.admin.filterQuery(req.query, fields);
		if(typeof conditions.username == 'undefined') conditions.username = {};
		if(typeof conditions.role == 'undefined') conditions.role = {};
		conditions.username.$ne =  req.session.admin_userdata.username;
		conditions.role.$ne =  'root';
		var query_string = helpers.admin.build_query(req.query);
		var limit = appConfig.grid_limit;
		var skip = limit * (page - 1);
		var sort = { createdAt: -1 };
		var select = Object.keys(fields).join(' ');
		var query_link = _baseUrl + mod_config.route + '?' + query_string;
		var branch_id = req.session.admin_userdata.branch;
		var restaurant_id = req.session.admin_userdata.restaurant;
		var role = req.session.admin_userdata.role;
		if (role == 'admin' || role == 'admin_booking'){
			conditions['branch'] = branch_id;
		}
		if (role == 'manager'){
			conditions['restaurant'] = restaurant_id;
		}
		var totals = await adminModel.count(mod_config.collection,conditions);
		var paginator = helpers.admin.pagination(query_link,page,totals,limit);

		//get data
		//dataView.lists = (totals > 0) ? await adminModel.find(mod_config.collection,conditions,select,sort,limit,skip) : [];
		dataView.lists = [];
		if(totals > 0){
            dataView.lists = await adminModel.find(mod_config.collection,conditions,select,sort,limit,skip);
        }

		//check permission using display button
		dataView.perms = req.session.admin_userdata.perms;
        dataView.role = req.session.admin_userdata.role;
		dataView.fields = fields;
		dataView.output_paging = paginator.render();
		dataView.total_record = totals;
		dataView.query_get = req.query;
		dataView.query_string = query_string;
		return res.render('./'+mod_config.module+'/'+mod_config.view+'/list', dataView);
	} catch (e) {
		console.log(e);
		req.flash('msg_error','Has Error');
		return res.redirect(_adminUrl);
	}
});

//Get add
users.get('/add', async function(req, res){
	try {
        var dataView = helpers.admin.get_data_view_admin(req,mod_config);
        dataView.branch = req.session.admin_userdata.branch;
		var ignore_fields = '__v update_by createdAt updatedAt email verify login_incorrect login_time';
		dataView.fields = await adminModel.get_fields(mod_config,ignore_fields);
		res.render('./'+mod_config.module+'/'+mod_config.view+'/add', dataView);
	} catch (e) {
		console.log(e);
		req.flash('msg_error',e.message);
		return helpers.base.redirect(res,mod_config.route);
	}
});

//Post add
users.post('/add', async function(req, res){
	try {
		var post_data = req.body;
		if (!post_data.role){
			post_data.role = 'admin_booking';
		}
		/*if (post_data.role == 'manager'){
			var branch_array =[];
			var branch_list = await ezbookingModel.find('ezbookingBranchs',{restaurant_id: post_data.restaurant},'_id');
			branch_list.forEach(function(item){
				branch_array.push(item['_id']);
				post_data.branch = branch_array.toString();
			});
		}*/
		req.flash('post_data',post_data);

		var validator = new helpers.validate();
	    validator.isFormatUsername(post_data.username);
	    validator.isFormatPassword(post_data.password);
	    validator.notEmpty(post_data.fullname,'fullname không được bỏ trống');
		validator.checkBody('status','isBoolean',req);
		var valid_error = validator.hasErrors();
		if(valid_error){
			req.flash('valid_errors',valid_error);
			return helpers.base.redirect(res,mod_config.route+'/add');
		}

		if(appConfig.role_systems.indexOf(post_data.role) == -1){
			req.flash('valid_errors',"Invalid Role");
			return helpers.base.redirect(res,mod_config.route+'/add');
		}

		//check exists
		var record = await adminModel.findOne(mod_config.collection,{'username': post_data.username});
		if(record){
			req.flash('valid_errors','Username already exists');
			return helpers.base.redirect(res,mod_config.route+'/add');
		}

		var dataAdd = await adminModel.filterData(mod_config.collection,post_data,'__v');
		dataAdd.update_by = helpers.admin.get_update_by(req);
		dataAdd.password = helpers.admin.hash_password(post_data.password);
		dataAdd.avatar = 'public/admin/images/avatar/unknown.jpg';

		//create
		var create = await adminModel.create(mod_config.collection, dataAdd);
		if(create.status === true){
			//add permission dashboard for role
			//check exists
			var countPerm = await adminModel.count('adminPermissions',{'role': post_data.role,"module" : "admin","resource" : "dashboard"});
			if(countPerm == 0){
				var dataPerm = {
					"role" : post_data.role,
					"module" : "admin",
					"resource" : "dashboard",
					"permissions" : [
						"view",
						"update-profile"
					]
				};
				await adminModel.create('adminPermissions', dataPerm);
			}
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
users.get('/edit/:id', async function (req, res) {
	try {
		//validate
		var validator = new helpers.validate();
		var valid_error = validator.isObjectId(req.params.id,'Invalid ID').hasErrors();
		if(valid_error){
			req.flash('msg_error',valid_error[0]);
			return helpers.base.redirect(res,mod_config.route);
		}

		var record = await adminModel.findOne(mod_config.collection,{'_id':req.params.id});
		if (record) {
			var dataView = helpers.admin.get_data_view_admin(req,mod_config);
			var ignore_fields = '__v username role status update_by createdAt updatedAt avatar email verify login_incorrect login_time password';
			dataView.fields = await adminModel.get_fields(mod_config, ignore_fields);
			dataView.data_edit = dataView.post_data.length > 0 ? dataView.post_data[0] : record;
			return res.render('./'+mod_config.module+'/'+mod_config.view+'/edit', dataView);
		}else{
			req.flash('msg_error', 'Data does not exist');
			return helpers.base.redirect(res,mod_config.route);
		}
	} catch(e) {
		console.log(e.message);
		req.flash('msg_error', 'Error: '+e.message);
		return helpers.base.redirect(res,mod_config.route);
	}
});

//post edit
users.post('/edit/:id', async function (req, res) {
	try {
		var post_data = req.body;
		req.flash('post_data',post_data);
		console.log('post_data',post_data);

		//validation
		var validator = new helpers.validate();
	    //validator.isFormatEmail(req.body.username,'Email không hợp lệ');
	    //validator.isFormatPhone(req.body.phone,'Số điện thoại không hợp lệ');
	   // validator.notEmpty(req.body.company,'Công ty không được bỏ trống');
	    //validator.notEmpty(req.body.job_title,'Chức danh không được bỏ trống');
	    //validator.isFormatEmail(req.body.email_account_support,'Email hỗ trợ không hợp lệ');
		//validator.isNumeric(req.body.status,'Tình trạng không hợp lệ');
		var valid_error = validator.hasErrors();
		if(valid_error){
			req.flash('valid_errors',valid_error);
			return helpers.base.redirect(res,mod_config.route+'/edit/'+req.params.id);
		}

		if(!post_data._id || post_data._id != req.params.id){
			req.flash('msg_error','Invalid ID');
			return helpers.base.redirect(res,mod_config.route);
		}

		//check exists
		var where = {
			username : {$eq:post_data.username.trim()},
			_id : {$not:{$eq:post_data._id}}
		};

		var record = await adminModel.findOne(mod_config.collection,where);
		if(record){
			req.flash('msg_error','username already exists');
			return helpers.base.redirect(res,mod_config.route+'/edit/'+req.params.id);
		}
		var dataUpdate = await adminModel.filterData(mod_config.collection,post_data,'__v _id');
		dataUpdate.update_by = helpers.admin.get_update_by(req);
		if(post_data.update_password == 1){
			var password_error = validator.isFormatPassword(post_data.password,'Mật khẩu phải từ 6-30 ký tự, tối thiểu 1 chữ hoa, 1 chữ thường, 1 chữ số').hasErrors();
			if(password_error){
				req.flash('valid_errors',password_error);
				return helpers.base.redirect(res,mod_config.route+'/edit/'+req.params.id);
			}else{
				dataUpdate.password = helpers.admin.hash_password(post_data.password);
			}
		}else{
			delete dataUpdate.password;
		}

		var conditions = {'_id': req.params.id};
		var update = await adminModel.update(mod_config.collection, conditions, dataUpdate);

		if(update.status){
			req.flash('msg_success','Edit success.');
			return helpers.base.redirect(res,mod_config.route);
		} else {
			req.flash('msg_error',update.msg);
			return helpers.base.redirect(res,mod_config.route+'/edit/'+req.params.id);
		}

	} catch(e) {
		console.log(e.message);
		req.flash('msg_error',e.message);
		return helpers.base.redirect(res,mod_config.route);
	}

});

//GET import
users.get('/import', function (req, res) {
    try {
        var dataView = helpers.admin.get_data_view_admin(req, mod_config);
        res.render('./layout/partial/import', dataView);
    } catch (e) {
        console.log(e);
        req.flash('msg_error', e.message);
        return helpers.base.redirect(res, mod_config.route);
    }
});

/** POST import
 *
 */
users.post('/import', function (req, res) {
    try {
        var total = req.body.resumableTotalChunks;
        var num = req.body.resumableChunkNumber;
        resum.post(req, function (status, filename, original_filename, identifier, numberOfChunks) {
            if ('done' == status && num == total) {
                req.session.upload_finish = true;
                var ext = filename.split('.').pop();
                filename = helpers.hash.md5(filename.replace(/[^0-9a-zA-Z_-]/img, ''));
                var file_path = _basepath + 'media/import/' + filename + '.' + ext;
                resum.write(identifier, file_path, async function (result) {
                    if (result) {
                        resum.clean(identifier);
                        var import_data = await helpers.admin.import_data(file_path, mod_config);
                        import_data.status = 'import_finished';
                        res.json(import_data);
                    } else {
                        res.json({ status: 'write_false' });
                    }
                });
            } else {
                res.json({ status: status });
            }
        });
    } catch (e) {
        console.log(e);
        res.json({ status: e.message });
    }
});

//GET Export
users.get('/export', async function(req, res){
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

// POST Export
users.post('/export', async function(req, res){
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
users.post('/delete', async function (req, res) {
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
		req.flash('msg_error',e.message);
		return helpers.base.redirect(res,mod_config.route);
	}
});

//Get detail
users.get('/detail/:_id', async function(req, res){
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
module.exports = users;
