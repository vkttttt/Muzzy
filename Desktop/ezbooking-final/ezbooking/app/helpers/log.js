var express = require("express");
var moment = require('moment');
var fs = require('fs');

var applog = express();

// flags : 'a' means appending (old data will be preserved)
applog.debug = function (data, label = '', file_name = '') {
    try {
        var today = new Date();
        var dir = _basepath + 'media/logs/debug/';
        var logfile = (file_name) ? file_name + '.txt' : 'debug.txt';
        var logTime = moment(today).format("YYYY-MM-DD HH:mm:ss");

        //Check if the file exists in the current directory.
        fs.access(dir, fs.constants.F_OK, (err) => {
            if (err) {
                try {
                    fs.mkdirSync(dir, { recursive: true });
                } catch (e) {
                    console.log('mkdirSync', e);
                    return false;
                }
            }
            data = logTime + ' ' + label + ' ' + JSON.stringify(data) + '\n';
            var stream = fs.createWriteStream(dir + logfile, { flags: 'a' }).end(data);
            stream.on('error', function (e) { stream.end(); });
            return true;
        });
    } catch (e) {
        console.log(e);
        return false;
    }
};


applog.writeError = function (data, label = '', file_name = '') {
    try {
        var today = new Date();
        let logTime = moment(today).format("YYYY-MM-DD HH:mm:ss");
        var dir = _basepath + 'media/logs/error/' + moment(today).format("YYYY/MM/DD") + '/';
        var logfile = (file_name) ? file_name + '.txt' : 'error.txt';

        //Check if the file exists in the current directory.
        fs.access(dir, fs.constants.F_OK, (err) => {
            if (err) {
                try {
                    fs.mkdirSync(dir, { recursive: true });
                } catch (e) {
                    console.log('mkdirSync', e);
                    return false;
                }
            }
            data = logTime + ' ' + label + ' ' + JSON.stringify(data) + '\n';
            var stream = fs.createWriteStream(dir + logfile, { flags: 'a' }).end(data);
            stream.on('error', function (e) { stream.end(); });
            return true;
        });
    } catch (e) {
        console.log(e);
        return false;
    }
};

applog.writeDatas = function (data, file_name = '') {
    try {
        var today = new Date();
        let logTime = moment(today).format("YYYY-MM-DD HH:mm:ss");
        var dir = _basepath + 'media/uploads/notification/logs/';
        var logfile = (file_name) ? file_name + '.txt' : 'datas.txt';

        //Check if the file exists in the current directory.
        fs.access(dir, fs.constants.F_OK, (err) => {
            if (err) {
                try {
                    fs.mkdirSync(dir, { recursive: true });
                } catch (e) {
                    console.log('mkdirSync', e);
                    return false;
                }
            }
            data = JSON.stringify(data) + '\n';
            var stream = fs.createWriteStream(dir + logfile, { flags: 'a' }).end(data);
            stream.on('error', function (e) { stream.end(); });
            return true;
        });
    } catch (e) {
        console.log(e);
        return false;
    }
};

applog.tracking = async function (req) {
    try {
        var admin_userdata = req.session.admin_userdata;
        if (typeof admin_userdata === 'undefined' || admin_userdata === null) {
            return;
        }
        //ignore router unnecessary
        var resources = helpers.base.parse_resource(req.originalUrl);
        if (resources.method == 'import') {
            return;
        }
        //console.log('resources',resources);
        //return;
        let query = null;
        if (req.method == 'GET' && Object.keys(req.query).length > 0) {
            query = Object.assign({}, req.query);
        } else if (req.method == 'POST' && Object.keys(req.body).length > 0) {
            query = Object.assign({}, req.body);
        }
        if (!query) return;

        //ignore fields unnecessary
        if (typeof query.password != undefined) delete query.password;
        if (typeof query.old_password != undefined) delete query.old_password;
        if (typeof query.new_password != undefined) delete query.new_password;
        if (typeof query.password != undefined) delete query.retype_password;
        if (typeof query.new_avatar != undefined) delete query.new_avatar;
        if (typeof query._csrf !== undefined) delete query._csrf;

        var data = {
            url: req.originalUrl,
            query: query
        };

        var today = new Date();
        var dir = _basepath + 'media/logs/tracking/' + moment(today).format("YYYY/MM/DD") + '/';
        var log_file = 'log.txt';
        var log_time = moment(today).format("HH:mm:ss");
        var fol = await this.createFolder(dir);
        if (fol === true) {
            var data_log = log_time + ' ' + admin_userdata.username + ' ' + req.method + ' ' + JSON.stringify(data) + '\n';
            var stream = fs.createWriteStream(dir + log_file, { flags: 'a' }).end(data_log);
            stream.on('error', function (e) { stream.end(); });
        }
    } catch (e) {
        console.log(e.message);
    }
};

applog.createFolder = function (dir) {
    return new Promise(function (resolve, reject) {
        fs.access(dir, fs.constants.F_OK, (err) => {
            if (err) {
                //no such file or folder
                if (err.code == 'ENOENT') {
                    fs.mkdir(dir, { recursive: true }, (err) => {
                        if (err) {
                            console.log('fs.mkdir', err);
                            return resolve(false);
                        } else {
                            return resolve(true);
                        }
                    });
                } else {
                    //not permitted or any reasons
                    console.log('fs.access', err);
                    return resolve(false);
                }
            } else {
                return resolve(true);
            }
        });
    });
};

applog.remove = function (path) {
    var dir = _basepath + 'media/logs/' + path;

    fs.stat(dir, function (err, stats) {
        if (err) {
            return false;
        }

        fs.unlink(dir, function (err) {
            if (err) return console.log(err);
        });
    });
    return true;
};

module.exports = applog;