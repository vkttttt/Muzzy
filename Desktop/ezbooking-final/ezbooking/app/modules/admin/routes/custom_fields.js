'use strict';

var express = require('express');
var Excel = require('exceljs');
var resum = require('../../../libs/resumable.js')('./media/uploads/resum');

var moduleModel = require('../models');
var mod_config = {
    module : 'admin',
    resource : 'custom_fields',
    collection : 'adminCustomFields',
    route : 'admin/custom_fields',
    view : 'custom_fields',
    alias : 'custom_fields'
};

var custom_fields = express.Router();
custom_fields.get('/', async function(req, res) {
    var dataView = helpers.admin.get_data_view_admin(req,mod_config);
    try {
        var fields = await moduleModel.get_fields(mod_config,'__v',dataView.role);
        var field_keys = Object.keys(fields);
        var page = (req.query.page) ? (req.query.page) : 1;
        var conditions = helpers.admin.filterQuery(req.query, fields);
        var query_string = helpers.admin.build_query(req.query);
        var limit = appConfig.grid_limit;
        var skip = limit * (page - 1);
        //var sort = { createdAt: -1 };
        var sort = helpers.admin.sortQuery(req.query);
        var select = field_keys.join(' ');
        var query_link = _baseUrl + mod_config.route+ '?' + query_string;
        var totals = await moduleModel.count(mod_config.collection,conditions);
        var paginator = helpers.admin.pagination(query_link,page,totals,limit);

        //assign data
        dataView.lists = [];
        if(totals > 0){
            dataView.lists = await moduleModel.find(mod_config.collection,conditions,select,sort,limit,skip);
        }

        //check permission using display button
        dataView.perms = req.session.admin_userdata.perms;
        dataView.fields = fields;
        dataView.field_keys = field_keys;
        dataView.output_paging = paginator.render();
        dataView.total_record = totals;
        dataView.query_get = req.query;
        dataView.query_string = query_string;
        dataView.curent_url = req.originalUrl;
        return res.render('./'+mod_config.module+'/'+mod_config.view+'/list', dataView);
    } catch (e) {
        console.log(e);
        req.flash('msg_error',e.message);
        return res.redirect(_adminUrl);
    }
});


//Get add
custom_fields.get('/add', async function(req, res){
    try {
        var dataView = helpers.admin.get_data_view_admin(req,mod_config);
        var ignore_fields = '__v';
        var fields = await moduleModel.get_fields(mod_config, ignore_fields);
        dataView.field_keys = Object.keys(fields);
        dataView.roles_list = await moduleModel.findAll('adminRoles',{},'',{name:1});
        dataView.modules_list = await moduleModel.findAll('adminModules',{},'',{name:1});
        //dataView.resources_list = await moduleModel.findAll('adminResources',{},'',{name:1});
        
        res.render('./'+mod_config.module+'/'+mod_config.view+'/add', dataView);
    } catch (e) {
		console.log(e);
		req.flash('msg_error',e.message);
		return helpers.base.redirect(res,mod_config.route);
    }
});

//Post add
custom_fields.post('/add', async function(req, res){
    try {
        req.flash('post_data',req.body);
        //validate
        var validator = new helpers.validate();
        validator.notEmpty(req.body.role,'Role is requied !');
        validator.notEmpty(req.body.module,'Module is requied !');
        validator.notEmpty(req.body.resource,'Resource is requied !');
        var valid_error = validator.hasErrors();
        if(valid_error){
            req.flash('valid_errors',valid_error);
            return helpers.base.redirect(res,mod_config.route+'/add');
        }

        //check exists
        let where = {
            role : req.body.role,
            module : req.body.module,
            resource : req.body.resource,
        }
        let record = await moduleModel.count(mod_config.collection, where);
        if (record > 0) {
            req.flash('valid_errors', 'Data already exists');
            return helpers.base.redirect(res, mod_config.route + '/add');
        }

        var dataAdd = await moduleModel.filterData(mod_config.collection,req.body);
        dataAdd.update_by = helpers.admin.get_update_by(req);
        var create = await moduleModel.create(mod_config.collection, dataAdd, true);
        if(create.status){
            req.flash('msg_success','Add success');
            return helpers.base.redirect(res,mod_config.route);
        } else {
            req.flash('msg_error',create.msg);
            return helpers.base.redirect(res,mod_config.route+'/add');
        }
    } catch(e) {
        req.flash('msg_error',e.message);
        return helpers.base.redirect(res,mod_config.route+'/add');
    }
});

//Get edit
custom_fields.get('/edit/:id', async function (req, res) {
    try {
        //validate
        var validator = new helpers.validate();
        var valid_error = validator.isObjectId(req.params.id,'ID must be ObjectId').hasErrors();
        if(valid_error){
            req.flash('msg_error',valid_error);
            return helpers.base.redirect(res,mod_config.route);
        }

        var record = await moduleModel.findOne(mod_config.collection,{'_id':req.params.id},'-__v -update_by -createdAt -updatedAt');
        if (record) {
            var dataView = helpers.admin.get_data_view_admin(req,mod_config);
            var fields = [];
            var collection = await moduleModel.findOne('adminResources',{name:record.resource,module:record.module},'-_id collection_name');
            if(collection && collection.collection_name){
                var otherModel = require('../../'+record.module+'/models');
                fields = await otherModel.get_fields({module : record.module,resource : record.resource,collection : collection.collection_name});
            }
            dataView.field_keys = Object.keys(fields);
            dataView.modules_list = await moduleModel.findAll('adminModules',{},'',{name:1});
            dataView.resources_list = await moduleModel.findAll('adminResources',{module:record.module},'',{name:1});
            dataView.roles_list = await moduleModel.findAll('adminRoles',{},'',{name:1});
            dataView.data_edit = dataView.post_data.length > 0 ? dataView.post_data[0] : record;
            return res.render('./'+mod_config.module+'/'+mod_config.view+'/edit', dataView);
        }else{
            req.flash('msg_error', 'Data null');
            return helpers.base.redirect(res,mod_config.route);
        }
    } catch(e) {
        req.flash('msg_error',e.message);
        return helpers.base.redirect(res,mod_config.route);
    }
});

//post edit
custom_fields.post('/edit/:id', async function (req, res) {
    try {
        var post_data = req.body;
        req.flash('post_data',post_data);
        //return helpers.base.redirect(res,mod_config.route+'/edit/'+req.params.id);
        //validate
        var validator = new helpers.validate();
        var valid_error = validator.isObjectId(post_data._id,'Invalid ID').hasErrors();
        if(valid_error){
            req.flash('msg_error',valid_error[0]);
            return helpers.base.redirect(res,mod_config.route);
        }

        if(!post_data._id || post_data._id != req.params.id){
            req.flash('valid_errors','Invalid ID');
            return helpers.base.redirect(res,mod_config.route);
        }

        //check exists different current _id
        var where = {
            role : req.body.role,
            module : req.body.module,
            resource : req.body.resource,
            _id : {$not:{$eq:post_data._id}}
        };
        var record = await moduleModel.count(mod_config.collection,where);
        if(record > 0){
            req.flash('msg_error','Data already exists');
            return helpers.base.redirect(res,mod_config.route+'/edit/'+req.params.id);
        }

        var dataUpdate = await moduleModel.filterData(mod_config.collection,post_data,'__v _id');
        dataUpdate.update_by = helpers.admin.get_update_by(req);
        var update = await moduleModel.update(mod_config.collection, {'_id': req.params.id}, dataUpdate,true);
        if(update.status === true){
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
custom_fields.get('/import', function(req, res){
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
custom_fields.post('/import', function(req, res){
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

//Export
custom_fields.post('/export', async function(req, res){
    try {
        //assign data
        var fields = await moduleModel.get_fields(mod_config,'__v');
        if(fields == null){
            return res.json({status : 'error', msg : 'Error'});
        }
        var conditions = helpers.admin.filterQuery(req.query, fields);

        var ex_arr_field = [];
        var field_keys = Object.keys(fields);
        for(let i = 0;i < field_keys.length;i++){
            var item = { header: field_keys[i], key : field_keys[i], width : 50 };
            ex_arr_field.push(item);
        }

        var timeBegin = new Date().getTime();
        var file_name = mod_config.resource+'_'+timeBegin+'.xlsx';
        var tempFilePath = _basepath+'media/export/'+file_name;

        await helpers.file.createFolder(_basepath+'media/export');

        var options = {};
        options.filename = tempFilePath;

        const workbook = new Excel.stream.xlsx.WorkbookWriter(options);

        var worksheet = null;
        var num = 0;
        const MAX_RECORD = 1000000;

        //first
        worksheet = workbook.addWorksheet('Report Sheet ' + Math.ceil(num / MAX_RECORD));
        worksheet.columns = ex_arr_field;
        worksheet.state = 'visible';

        var stream = await moduleModel.get_stream(mod_config.collection, conditions);

        stream.on('error', (e) => {
            return res.json({status : 'error', msg : e.message});
        });

        var count_data = 0;
        stream.on('data', (data) => {
            count_data++;
            if(count_data % 1000 == 0){
                console.log('count_data',count_data);
            }

            var item = {};
            for (let j = 0; j < field_keys.length; j++) {
                let field_type = fields[field_keys[j]];
                item[field_keys[j]] = helpers.admin.convertDataExport(data[field_keys[j]],field_type);
            }
            if (num != 0 &&(num % MAX_RECORD) === 0) {
                worksheet = workbook.addWorksheet('Report Sheet ' + Math.ceil(num / MAX_RECORD));
                worksheet.columns = ex_arr_field;
                worksheet.state = 'visible';
            }
            num++;
            worksheet.addRow(item).commit();
        });

        stream.on('end', () => {
            workbook.commit().then(() => {
                return res.json({status:'success',path:_staticUrl+'media/export/'+file_name});
            }).catch((e) => {
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
custom_fields.post('/delete', async function (req, res) {
    var post_data = req.body;
    if(post_data != null && !post_data.listViewId){
        req.flash('msg_error','Delete error.');
        return helpers.base.redirect(res,mod_config.route);
    }

    try	{
        var condition = { _id: { $in: post_data.listViewId } };
        var del = await moduleModel.deleteMany(mod_config.collection,condition);
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

module.exports = custom_fields;