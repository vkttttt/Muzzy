var fs = require("fs");
var md5 = require('md5');
var path = require('path');
var moment = require('moment');

var helper = {};

helper.createFolder = function(dir){
    return new Promise(function (resolve, reject) {
        fs.access(dir, fs.constants.F_OK, (err) => {
            if (err){
                //no such file or folder
                if(err.code == 'ENOENT'){
                    fs.mkdir(dir, { recursive: true }, (err) => {
                        if (err) {
                            console.log('fs.mkdir',err);
                            return resolve(false);
                        }else{
                            return resolve(true);
                        }
                    });
                } else {
                    //not permitted or any reasons
                    console.log('fs.access',err);
                    return resolve(false);
                }
            }else{
                return resolve(true);
            }
        });
    });
};

helper.writeBase64 = function(base64Data, path){
    return new Promise(async function (resolve, reject) {
        try {
            if(base64Data.indexOf('data:image') === -1) return resolve(false);
            base64Data = base64Data.replace(/^data:image\/png;base64,/, "").replace(/^data:image\/jpg;base64,/, "").replace(/^data:image\/jpeg;base64,/, "");
            var dir = _basepath+path;
            var ttt = new Date();
            var file_name = md5(ttt.getTime())+'.jpg';
            fs.writeFile(dir+'/'+file_name, base64Data, 'base64', function(err) {
                if(err){
                    if(err.code == 'ENOENT'){
                        fs.mkdir(dir, { recursive: true }, (err) => {
                            if (err) {
                                console.log('mkdir',err);
                                resolve(false);
                            } else {
                                //callback writeFile
                                fs.writeFile(dir+'/'+file_name, base64Data, 'base64', function(err) {
                                    return (err) ? resolve(false) : resolve(path+'/'+file_name);
                                });
                            }
                        });
                    }else{
                        resolve(false);
                    }
                } else {
                    resolve(path+'/'+file_name);
                }
            });
        } catch(e) {
            console.log(e);
            resolve(false);
        }
    });
};

helper.writeXLSX = function(base64Data, path){
    return new Promise(async function (resolve, reject) {
        try {
            if(base64Data.indexOf('data:application') === -1) return resolve(false);
            //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
            base64Data = base64Data.replace(/^data:application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet;base64,/, "");
            var dir = _basepath+path;
            var ttt = new Date();
            var file_name = md5(ttt.getTime())+'.xlsx';
            fs.writeFile(dir+'/'+file_name, base64Data, 'base64', function(err) {
                if(err){
                    if(err.code == 'ENOENT'){
                        fs.mkdir(dir, { recursive: true }, (err) => {
                            if (err) {
                                console.log('mkdir',err);
                                resolve(false);
                            } else {
                                //callback writeFile
                                fs.writeFile(dir+'/'+file_name, base64Data, 'base64', function(err) {
                                    return (err) ? resolve(false) : resolve(file_name);
                                });
                            }
                        });
                    }else{
                        resolve(false);
                    }
                } else {
                    resolve(file_name);
                }
            });
        } catch(e) {
            console.log(e);
            resolve(false);
        }
    });
};

/**
 *
 * @param content
 * @param path
 * @param file_name [png,jpg,txt]
 * @param flag
 */
helper.writeFile = function(content, path, file_name, flag = 'a'){
    var dir = _basepath+path;
    content = content.replace(/^data:application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet;base64,/, "");
    var stream = fs.createWriteStream(dir+file_name, {flags: flag}).end(content);
    stream.on('error', (err) => {
        console.log('content',content);
        if(err.code == 'ENOENT'){
            fs.mkdir(dir, { recursive: true }, (err) => {
                if (err === null) {
                    //callback writeFile
                    var stream_b = fs.createWriteStream(dir+file_name, {flags: flag}).end(content);
                    stream_b.on('error',(err) => {
                        console.log('stream_b',err);
                        stream_b.end();
                    });
                } else {
                    console.log('mkdir',err);
                }
            });
        }else if(err !== null){
            console.log('err1',err);
        }
        stream.end();
    });
};

helper.writeBanner = function(data){
    return new Promise(function (resolve, reject) {
        var today = new Date();
        var file_name = md5(today.getTime())+'.jpg';
        var path = 'media/banner/'+moment(today).format('YYYY/MM/DD')+'/';
        var dir = _basepath + path;
        var img_link = _staticUrl+path+file_name;
        //return resolve(dir);
        fs.writeFile(dir+file_name, data, (err) => {
            if(err === null){
                return resolve(img_link);
            }
            if (err.code == 'ENOENT'){
                //create folder
                fs.mkdir(dir, { recursive: true }, (err) => {
                    if (err === null) {
                        fs.writeFile(dir+file_name, data, (err) => {
                            if(err === null){
                                return resolve(img_link);
                            }
                        });
                    }else{
                        return resolve('');
                    }
                });
            }else{
                return resolve('');
            }
        });
    });
};

helper.uploadThumbnail = function(file){
    return new Promise(function (resolve, reject) {
        var today = new Date();
        var file_name = md5(today.getTime())+'.jpg';
        var path = 'media/photo/'+moment(today).format('YYYY/MM/DD')+'/';
        var dir = _basepath + path;
        var img_link = _staticUrl+path+file_name;

        fs.writeFile(dir+file_name, file.data, (err) => {
            //success
            if(err === null) return resolve({error: null, link: img_link});
            //error
            if (err.code == 'ENOENT') {
                //create folder
                fs.mkdir(dir, { recursive: true }, (err) => {
                    if (err === null) {
                        fs.writeFile(dir+file_name, file.data, (err) => {
                            //success
                            if(err === null) return resolve({error: null, link: img_link});
                            //error
                            return resolve({error:err.message});
                        });
                    }else{
                        return resolve({error:err.message});
                    }
                });
            } else {
                return resolve({error:err.message});
            }
        });
    });
};

/**
 *
 * @param path
 * @param type
 */
helper.update_module = function(){
    var dir = _basepath+'media/module/builder_module.txt';
    var lr = new LineByLineReader(dir);
    lr.on('error', function (err) {
        console.log('err',err);
    });

    lr.on('line', function (line) {
        line = line.trim();
        try{
            var tmp = JSON.parse(line);
            console.log('tmp',tmp);
        }catch(e){

        }
    });

    lr.on('end', function () {

    });

};

helper.writeModule = function(module,resource,collection,schema){
    try {
        var dir = _basepath +'app/modules/'+module;
        var dir_routes = _basepath +'app/modules/'+module+'/routes';
        var dir_models = _basepath +'app/modules/'+module+'/models';
        var dir_views = _basepath +'app/views/'+module+'/'+resource;

        fs.mkdirSync(dir, { recursive: true });
        fs.mkdirSync(dir_routes, { recursive: true });
        fs.mkdirSync(dir_models, { recursive: true });
        fs.mkdirSync(dir_views, { recursive: true });

        //create module index.js
        var index_content = fs.readFileSync(_basepath+'app/modules/admin/template/index.txt', 'utf8');
        index_content = index_content.replace(/##module_name##/g, module);
        var index_stream = fs.createWriteStream(dir + '/index.js' , {flags: 'w'}).end(index_content);
        index_stream.on('error', (err) => {console.log('err',err);index_stream.end();});


        //create route
        var route = module+'/'+resource;
        var route_content = fs.readFileSync(_basepath+'app/modules/admin/template/route.txt', 'utf8');
        route_content = route_content.replace(/##route_name##/g, route).replace(/##resource_name##/g, resource).replace(/##module_name##/g, module).replace(/##collection_name##/g, collection);
        var route_stream = fs.createWriteStream(dir_routes + '/'+resource+'.js' , {flags: 'w'}).end(route_content);
        route_stream.on('error', (err) => {console.log('err',err);route_stream.end();});

        //create model index if not exists
        fs.access(dir_models + '/index.js', fs.constants.F_OK, (err) => {
            if(err){
                var model_content = fs.readFileSync(_basepath+'app/modules/admin/template/model_index.txt', 'utf8');
                var model_stream = fs.createWriteStream(dir_models + '/index.js' , {flags: 'w'}).end(model_content);
                model_stream.on('error', (err) => {console.log('err',err);model_stream.end();});
            }
        });

        //create schema
        var fields = '';
        schema.forEach(function(item,index){
            fields += (index == schema.length - 1) ? '\t'+item+':String' : '\t'+item+':String,'+'\n';
        });
        var schema_content = fs.readFileSync(_basepath+'app/modules/admin/template/model_schema.txt', 'utf8');
        schema_content = schema_content.replace(/##collection_name##/g, collection).replace(/<fields>/g, fields);
        var schema_stream = fs.createWriteStream(dir_models + '/'+collection+'.js' , {flags: 'w'}).end(schema_content);
        schema_stream.on('error', (err) => {console.log('err',err);schema_stream.end();});

        //create view index
        var view_index = fs.readFileSync(_basepath+'app/modules/admin/template/view_index.txt', 'utf8');
        var view_index_stream = fs.createWriteStream(dir_views + '/list.ejs' , {flags: 'w'}).end(view_index);
        view_index_stream.on('error', (err) => {console.log('err',err);view_index_stream.end();});

        //create view add
        var view_add = fs.readFileSync(_basepath+'app/modules/admin/template/view_add.txt', 'utf8');
        var view_add_stream = fs.createWriteStream(dir_views + '/add.ejs' , {flags: 'w'}).end(view_add);
        view_add_stream.on('error', (err) => {console.log('err',err);view_add_stream.end();});

        //create view add
        var view_edit = fs.readFileSync(_basepath+'app/modules/admin/template/view_edit.txt', 'utf8');
        var view_edit_stream =fs.createWriteStream(dir_views + '/edit.ejs' , {flags: 'w'}).end(view_edit);
        view_edit_stream.on('error', (err) => {console.log('err',err);view_edit_stream.end();});

    } catch(e){
        return console.log(e.message);
    }
};

helper.removeModule = function(modules){
    modules.forEach(function(module){
        var dir_module = _basepath +'app/modules/'+module;
        var dir_views = _basepath +'app/views/'+module;
        deleteFolderRecursive(dir_module);
        deleteFolderRecursive(dir_views);
    });
};

helper.removeResource = function(resources){
    //return false;
    resources.forEach(function(resource){
        var file_model = 'app/modules/'+resource.module+'/models/'+resource.collection_name+'.js';
        var file_route = 'app/modules/'+resource.module+'/routes/'+resource.name+'.js';
        var dir_views = _basepath+'app/views/'+resource.module+'/'+resource.name;
        helpers.file.removeFile(file_model);
        helpers.file.removeFile(file_route);
        deleteFolderRecursive(dir_views);
    });
};

helper.removeFile = function(path){
    return new Promise(function (resolve, reject) {
        var dir = _basepath + '/' + path;
        //check exists
        fs.access(dir, fs.constants.F_OK, (err) => {
            if(err === null){
                //unlink
                fs.unlink(dir,function(err){
                    if(err === null){
                        resolve(true);
                    }else{
                        console.log(err);
                        resolve(false);
                    }
                });
            } else {
                console.log(err);
                resolve(false);
            }
        });
    });
};

var deleteFolderRecursive = function(dir) {
    try{
        if (fs.existsSync(dir)) {
            fs.readdirSync(dir).forEach(function(file, index){
                var curPath = dir + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    console.log('curPath',curPath);
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(dir);
        }
    }catch(e){
        console.log(e);
    }
};

helper.clearCacheStatic = async function (url) {
    try {
        if (!url.match(/^http(s)?:\/\/.*/)) {
            url = _staticUrl + url
        }
        url = url.replace(/^https/, 'http')
        let params = {
            url: 'http://g2cache.zapps.vn/php/mixcache.php',
            method: 'POST',
            headers: {
                'Accept': 'text/html',
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            },
            data: {
                'txtLink': url
            }
        }
        let res = await helpers.base.http_request(params)
        return true;
    } catch (error) {
        console.log('clearCacheStatic', error);
        return false;
    }
}
module.exports = helper;