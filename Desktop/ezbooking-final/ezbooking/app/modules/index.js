var express = require('express');
var app = express();
var adminModel = require('./admin/models');
var fs = require('fs');
var path = require('path');
var mongoose = require('../configs/connect_mongodb');

//============================= LOAD MODULES ===================================//
adminModel.findAll('adminModules',{status:true}, 'name route', {},function(result){
    var modules = [];
    result.forEach(function(module){
        modules[module.name] = module.route;
    });
    fs.readdirSync(__dirname).filter(function(file){
        return (typeof modules[file] != 'undefined') && (file !== 'index.js') && (file.indexOf('.js') == -1);
    }).forEach(function(module){
        try{
            app.use(appConfig.prefix+modules[module], require('./'+module));
        }catch(e){
            console.log(e);
        }
    });
});
//============================= END MODULES ===================================//

//route frontend
app.use(appConfig.prefix+'/', require('./frontend'));

//route api
app.use(appConfig.prefix+'/api', require('./api'));
app.use(appConfig.prefix+'/tool', require('./tool'));

module.exports = app;