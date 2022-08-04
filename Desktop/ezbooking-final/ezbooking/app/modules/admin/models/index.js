var fs = require('fs');
var path = require('path');

//import all schema of module file in this dir, except index.js
var db = {};
fs.readdirSync(__dirname).filter(function(file){
    return (file.indexOf('.js') !== 0) && (file !== 'index.js') && (file !== 'adminModels.js');
}).forEach(function(file){
    var model = require(path.join(__dirname, file));
    db[model.modelName] = model;
});

//load model default
var my_model = require('../../../libs/mongoose');
var model = new my_model(db);

//load model custom
model['custom'] = {};

module.exports = model;
