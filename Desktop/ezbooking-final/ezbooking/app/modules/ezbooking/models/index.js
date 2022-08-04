var fs = require('fs');
var path = require('path');

// import all schema file in this dir, except index.js
var db = {};
fs.readdirSync(__dirname)
    .filter(function (file) {
        return file.indexOf('.js') !== 0 && file !== 'index.js';
    })
    .forEach(function (file) {
        var model = require(path.join(__dirname, file));
        db[model.modelName] = model;
    });

//load model default
var my_model = require('../../../libs/mongoose');
var model = new my_model(db);
    
//load model custom
model['custom'] = {
    checkCollection_add: async function (data){
        var where = {
            name: data.collection_name,
            status:true
        };
        var _collection = await model.findOne('ezbookingCollections',where);
        if(_collection){
            var num_of_branch = _collection.total_branchs + 1;
            _collection.branch_list.push(data._id); 
            var dataup = {
                branch_list: _collection.branch_list,
                total_branchs: num_of_branch,
            }
            var update = await model.update('ezbookingCollections',where,dataup);
            
            //var _collection = await model.findOne('ezbookingCollections',where);
            //console.log('2: ',_collection);
            return true;
        }
        return false;
    },
    checkCollection_remove: async function (collection_name, branch_id){
        var where = {
            name: collection_name,
            status:true
        };
        var _collection = await model.findOne('ezbookingCollections',where);
        if(_collection){
            var num_of_branch = _collection.total_branchs - 1;
            var list = _collection.branch_list.remove(branch_id);
            var data = {
                branch_list: list,
                total_branchs: num_of_branch,
            }
            var update = await model.update('ezbookingCollections',where,data);
            return true;
        }
        return false;
    },
}
module.exports = model;