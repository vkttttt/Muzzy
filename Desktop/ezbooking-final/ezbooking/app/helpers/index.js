var fs = require('fs');
var path = require('path');

var helpers = {};

var ignore = ['index.js'];

fs.readdirSync(__dirname).filter(function(file){
    return (file.lastIndexOf('.js') > 0) && (file.length - 3 == file.lastIndexOf('.js')) && ignore.indexOf(file) === -1;
}).forEach(function(file){
    var name = file.split('.')[0];
    helpers[name] = require(path.join(__dirname, file));
});

module.exports = helpers;
