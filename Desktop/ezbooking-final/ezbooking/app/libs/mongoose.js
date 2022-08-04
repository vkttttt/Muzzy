'use strict';

class my_model {
    constructor(c_db) {
        this.db = c_db;
    }

    filterData(model_name,post_data,exclude = '__v'){
        var data = {};
        try {
            var paths = this.db[model_name].schema.paths;
            var field_keys = [];
            Object.keys(paths).map(function(field) {
                if(exclude.indexOf(field) === -1){
                    field_keys.push(field);
                }
            });

            Object.keys(post_data).forEach(function(value){
                if(field_keys.indexOf(value) >= 0){
                    data[value] = post_data[value];
                }
            });
            return data;
        } catch(e) {
            console.log(e);
            return data;
        }
    }

    async get_fields (mod_config, exclude = '__v', role = null){
        var arrField = {};
        try{
            var paths = this.db[mod_config.collection].schema.paths;
            var custom_keys = null;
            if(role){
                custom_keys = await helpers.admin.get_custom_fields(mod_config.module,mod_config.resource,role);
            }
            var fields = (custom_keys === null) ? Object.keys(paths) : custom_keys;
            if(fields){
                fields.map(function(field) {
                    if(exclude.indexOf(field) === -1 && paths[field] != undefined){
                        arrField[field] = paths[field].instance;
                    }
                });
            }
            return arrField;
        }catch(e){
            console.log('get_fields',e);
            return {};
        }
    }

    async find(model_name, where = {}, fields = '', order = {}, limit = 20, skip = 0) {
        try {
            let items = await this.db[model_name].find(where,fields).skip(skip).sort(order).limit(limit);
            return (items) ? items : null;
        } catch (e) {
            console.log('error',e);
            return null;
        }
    }

    async findAll(model_name,where = {}, fields = '', order = {},callback = null){
        try{
            let items  = await this.db[model_name].find(where,fields).sort(order);
            return (callback) ? callback(items) : items;
        }catch(e){
            console.log('error',e);
            return (callback) ? callback(null) : null;
        }
    }

    async findOne(model_name, where = {}, fields = ''){
        try{
            let item  = await this.db[model_name].findOne(where,fields);
            return (item) ? item : null;
        }catch(e){
            console.log('error',e);
            return null;
        }
    }

    async get_stream(model_name, where, str_fields = '', order = { createdAt: 'desc' }) {
        try {

            let items = await this.db[model_name].find(where, str_fields).lean(true).stream();

            return items;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    //count
    async count(model_name,where={}) {
        try {
            var total = await this.db[model_name].countDocuments(where);
            return parseInt(total);
        } catch (e) {
            console.log('error',e);
            return null;
        }
    }

    //count distinct
    async distinct(model_name,field,where) {
        try {
            var total = await this.db[model_name].distinct(field,where);
            return total;
        } catch (e) {
            console.log('error',e);
            return null;
        }
    }

    /** Create
     *
     * return object {status,msg}
     *
     */
    async create(model_name, data, check_field = false, callback = false) {
        var result = {status:false, msg:''};
        if(!data || Object.keys(data).length <= 0){
            result.msg = 'Missing data';
            return callback ? callback(result) : result;
        }

        try {
            let mySchema = this.db[model_name];
            let tmp = eval(new mySchema(data));
            let new_item = await tmp.save();
            if(new_item){
                result.status = true;
                result.msg = new_item;
            }
            return callback ? callback(result) : result;
        } catch (e) {
            console.log(e);
            result.msg = e.message;
            return callback ? callback(result) : result;
        }
    }

    async insertMany(model_name,datas,callback){
        var result = {status:false, msg:''};

        try{
            let insert = await this.db[model_name].insertMany(datas);
            if(insert){
                result.status = true;
                result.msg = insert;
            }
            return callback ? callback(result) : result;
        }catch(e){
            result.msg = e.message;
            return callback ? callback(result) : result;
        }
    }
    /** Update
     *
     * return object {status,msg}
     *
     */
    async update(model_name,where,data,check_field = false, return_new = false, create_new = false){
        var result = {status:false, msg:''};
        try {
            let update = await this.db[model_name].findOneAndUpdate(where,data,{'new':return_new,'upsert' : create_new});
            if(update){
                result.status = true;
                result.msg = update;
                //console.log('aa: ',update);
                //console.log('data: ',data);
            }
            return result;
        } catch (e) {
            result.msg = e.message;
            return result;
        }
    }

    /** Update
     *
     * return object {status,msg}
     *
     */
    async updateMany(model_name,where,data,check_field = false){
        var result = {status:false, msg:''};
        try {
            if(check_field){
                result.msg = this.check_fields(model_name,data);
                if(result.msg) return result;
            }

            let update = await this.db[model_name].updateMany(where,data);
            if(update){
                result.status = true;
                result.msg = update;
            }
            return result;
        } catch (e) {
            result.msg = e.message;
            return result;
        }
    }

    /** Delete many
     *
     * return object {status,msg}
     *
     */
    async removeDocs(model_name,condition){
        var result = {status:false, msg:''};
        try {
            let del = await this.db[model_name].deleteOne(condition);
            if(del) result.status = true;
            return result;
        } catch(e) {
            result.msg = e.message;
            return result;
        }
    }

    /** Delete many
     *
     * return object {status,msg}
     *
     */
    async deleteMany(model_name,condition){
        var result = {status:false, msg:''};
        try{
            let del = await this.db[model_name].deleteMany(condition);
            if(del) result.status = true;
            return result;
        } catch(e) {
            result.msg = e.message;
            return result;
        }
    }

    /** Delete one
     *
     * return object {status,msg}
     *
     */
    async deleteOne(model_name,condition){
        var result = {status:false, msg:''};
        try{
            let del = await this.db[model_name].deleteOne(condition);
            if(del) result.status = true;
            return result
        }catch(e){
            result.msg = e.message;
            return result;
        }
    }

    //aggregate
    async aggregate(model_name, where, group_by, sum_by){
        let items;
        items = await this.db[model_name].aggregate(
            [
                {
                    "$group": {
                        "_id": '$' + group_by,
                        "count": { "$sum": 1 }
                    }
                }
            ]
        );
        return items;
    }

    async getRandom(model_name,num){
        let items;
        items = await this.db[model_name].aggregate([{ $sample: { size: num } }]);
        return items;
    }

    // aggregate custom with query
    async aggregateCustom(model_name, query) {
        let items;
        items = await this.db[model_name].aggregate(query);
        return items;

    }

    // aggregate stream data
    async aggregateCustomStream(model_name, query) {
        let items;
        
        items = await this.db[model_name].aggregate(query).cursor({ batchSize: 100 }).exec();
        // items = await this.db[model_name].aggregate(query);
        return items;

    }
}

module.exports = my_model;