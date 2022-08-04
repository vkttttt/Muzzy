var express = require('express');
var mongoose = require('mongoose');
var tool = express.Router();

tool.valid = function (req, res, next) {
    if (appConfig.env == 'pro') {
        var admin_userdata = req.session.admin_userdata;
        if (typeof admin_userdata === 'undefined' || admin_userdata === null || admin_userdata.role != 'root') {
            return helpers.base.redirect(res, 'admin/login');
        }
    }
    return next();
};

/*
 Tool index
 */
tool.get('/', tool.valid, function (req, res) {
    res.send('Tool');
});

/*
 Tool index
 */
tool.get('/checkVersions', tool.valid, async function (req, res) {
    try {
        var admin = new mongoose.mongo.Admin(mongoose.connection.db);
        var mongo_info = await admin.buildInfo();
        var redis_info = await libs.redis.info();
        var data = {
            mongo: mongo_info,
            redis: redis_info,
        };
        return res.json(data);
    } catch (e) {
        return res.send('Error: ' + e.message);
    }
});

/*
 Check collection infomation
 */
tool.get('/checkCollection', tool.valid, async function (req, res) {
    try {
        var col = req.query.c;
        if (!col) {
            return res.send('Missing params: ?c=colection');
        }
        var cur_db = mongoose.connection.db;
        var collinfo = await cur_db.listCollections({ name: col }).next();
        if (collinfo) {
            var indexes = await cur_db.collection(col).indexes();
            collinfo['indexes'] = indexes;
            return res.send(collinfo);
        }
        return res.send('Error: Not found collection ' + col);
    } catch (e) {
        return res.send('Error: ' + e.message);
    }
});

/*
 Tool index
 */
tool.get('/setIndex', tool.valid, async function (req, res) {
    try {
        var col = req.query.c;
        var fields = req.query.f;
        if (!col || !fields) {
            return res.send('Missing params: ?c=colection&f=field1,field2');
        }

        fields = fields.split(',');
        var keys = {};
        fields.forEach(function (i) {
            keys[i] = 1;
        });

        var cur_db = mongoose.connection.db;
        var collinfo = await cur_db.listCollections({ name: col }).next();
        if (collinfo) {
            var result = await cur_db.collection('relative_order_user').createIndex(keys, { unique: true });
            return res.send(result);
        }
        return res.send('Error: Not found collection ' + col);
    } catch (e) {
        return res.send('Error: ' + e.message);
    }
});

/*
 Redis
 */
tool.get('/redis/get', tool.valid, async function (req, res) {
    try {
        var key = req.query.k;
        if (key === undefined) {
            return res.send('Missing param k: ?k=key');
        }
        key = appConfig.redis.prefix + key;
        let data = await libs.redis.get(key);
        return data ? res.json(data) : res.send('null');
    } catch (e) {
        res.send(e.message);
    }
});

/*
 Redis
 */
tool.get('/redis/gets', tool.valid, async function (req, res) {
    try {
        let keys = await libs.redis.list_keys(appConfig.redis.prefix);
        let values = await libs.redis.get_multiple(keys);
        var arr = {};
        for (let i = 0; i < keys.length; i++) {
            arr[keys[i]] = values[i];
        }
        return res.json(arr);
    } catch (e) {
        res.send(e.message);
    }
});

/*
 Redis
 */
tool.get('/redis/reset', tool.valid, async function (req, res) {
    try {
        let keys = await libs.redis.list_keys(appConfig.redis.prefix);
        keys.forEach(function (key) {
            libs.redis.del(key);
        });
        return res.json('Done');
    } catch (e) {
        res.send(e.message);
    }
});

/*
 Redis
 */
tool.get('/redis/set', tool.valid, function (req, res) {
    try {
        var key = req.query.k;
        var value = req.query.v;

        if (key === undefined) {
            return res.send('Missing param k: ?k=key&v=value');
        }
        key = appConfig.redis.prefix + key;
        libs.redis.set(key, value);
        res.send('set finish');
    } catch (e) {
        res.send(e.message);
    }
});

/*
 Redis
 */
tool.get('/redis/del', tool.valid, async function (req, res) {
    try {
        var key = req.query.k;
        if (key === undefined) {
            return res.send('Missing param k: ?k=key');
        }
        key = appConfig.redis.prefix + key;
        var del = await libs.redis.del(key);
        res.send('delete ' + key + ' finish');
    } catch (e) {
        res.send(e.message);
    }
});

/*
 List collection
 */
tool.get('/list_collection', tool.valid, function (req, res) {
    //var mongoose = require('mongoose');
    //return res.send('Done');
    try {
        var data = { title: 'List Collections' };
        var cur_db = mongoose.connection.db;
        cur_db.listCollections().toArray(function (err, names) {
            if (err) {
                data.error = err;
                res.send(data);
            } else {
                data.collections = [];
                names.forEach(function (e, i, a) {
                    //console.log(i);
                    //console.log("--->>", e.name);
                    data.collections.push(e.name);
                    //data.collections[i] = e.name;
                });
                res.send(data);
            }
        });
    } catch (e) {
        console.log(e);
    }
});

/*
 Xoa collection
 */
tool.get('/remove_collection', tool.valid, function (req, res) {
    //return res.send('Done');
    try {
        var collect_name = req.query.k;
        if (collect_name === undefined) {
            return res.send('Missing param k: ?k=adfashd');
        }

        //Xoa collection
        var cur_mrd_db = mongoose.connection.db;
        try {
            cur_mrd_db.dropCollection(collect_name, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            res.send(e.message);
        }
    } catch (e) {
        res.send(e.message);
    }
});

// show index collections
tool.get('/check_index_collection', tool.valid, async function (req, res) {
    // return res.send('Done');
    var cur_mrd_db = mongoose.connection.db;
    var indexes = [];
    let collections = await cur_mrd_db.collections();
    collections.forEach(async (col, index) => {
        let id = await col.indexes();
        indexes.push(id);
        if (index == collections.length - 1) {
            return res.send(indexes);
        }
    });
});

// Danh index cho collection: /collection?field=1
tool.get('/index_collection/:id', tool.valid, async function (req, res) {
    // return res.send('Done');
    try {
        var collect_name = req.params.id;
        var fields = req.query;
        var unique = req.query.unique;

        if (collect_name === undefined) {
            return res.send('Missing param collection: /abc');
        }
        console.log(fields, 's');
        delete fields.unique;
        Object.keys(fields).forEach((e) => {
            try {
                fields[e] = parseInt(fields[e]);
            } catch (error) {
                fields[e] = 1;
            }
        });
        console.log(fields);
        // return;
        console.log(unique, 'unique');
        // fields['createdAt'] = -1;

        var cur_mrd_db = mongoose.connection.db;
        //Tao collection
        try {
            // cur_mrd_db.dropCollection(collect_name, async function(err, result) {
            //     if(err){
            //         res.send(err);
            //     }else{
            // cur_mrd_db.createCollection(collect_name);
            var collection = await cur_mrd_db.collection(collect_name);
            if (unique) {
                var creIndex = await collection.createIndex(fields, { unique: true });
                console.log(creIndex, 'creIndex');
            } else {
                var creIndex = await collection.createIndex(fields);
            }

            var indexes = await collection.indexes();
            res.send(indexes);
            //     }
            // });
        } catch (e) {
            res.send(e.message);
        }
    } catch (e) {
        res.send(e.message);
    }
});

tool.get('/test', tool.valid, function (req, res) {
    try {
        let file_out = req.query.url;
        helpers.file.clearCacheStatic(file_out);
        res.send('Done');
    } catch (error) {
        res.send(error.message);
    }
});

tool.get('/test_mail', tool.valid, async function (req, res) {
    try {
        let sendMailByGmail = function (datasendMail, type) {
            return new Promise((resolve, reject) => {
                var nodemailer = require('nodemailer');
                var proxy = require('proxy-agent');
                var HttpsProxyAgent = require('https-proxy-agent');

                var options = {
                    service: 'Gmail',
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // use SSL
                    auth: {
                        user: 'pakadin404@gmail.com',
                        pass: 'orghwzgaslwtvgco',
                        //user: 'throwback2019.zing@gmail.com',
                        //pass: 'hahalolo2019'
                    },
                    // proxy: appConfig.http_proxy,
                    proxy: 'http://10.30.46.99:3128',
                };
                if (type[0] == 1) {
                    options.secure = false;
                }
                if (type[1] == 1) {
                    options.proxy = 'https://10.30.46.99:3128';
                } else if (type[1] == 2) {
                    options.proxy = proxy('http://10.30.46.99:3128');
                } else if (type[1] == 3) {
                    options.proxy = proxy('https://10.30.46.99:3128');
                } else if (type[1] == 4) {
                    var agent = new HttpsProxyAgent(proxy);
                    options.proxy = agent;
                }
                if (type[2] == 1) {
                    options.tls = {
                        // do not fail on invalid certs
                        rejectUnauthorized: false,
                    };
                }
                console.log('options', options);

                var transporter = nodemailer.createTransport(options);

                // verify connection configuration
                // transporter.verify(function (error, success) {
                //     if (error) {
                //         console.log('verify',error);
                //         reject('');
                //     } else {
                const mailOptions = {
                    from: datasendMail.from, // sender address
                    to: datasendMail.to, // list of receivers
                    subject: datasendMail.subject, // Subject line
                    html: datasendMail.html, // plain text body
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log('sendMail', err);
                        reject('');
                    } else resolve(info);
                });
                //     }
                // });
            });
        };
        var datasendMail = {
            from: 'Throwback2019 <throwback2019.zing@gmail.com>', // sender address
            to: 'truongnx102@gmail.com', // list of receivers
            subject: 'test', // Subject line
            html: 'test', // plain text body
        };
        if (req.query.type == 'none') {
            let data = {
                status: 1,
                email: 'phuong.nam1712@gmail.com',
                fb_id: '12345678',
            };
            helpers.map.sendMail(data);
        } else {
            let sendmail = await sendMailByGmail(datasendMail, req.query.type || '000');
            console.log(sendmail);
        }
        res.send('Done');
    } catch (error) {
        res.send(error.message);
    }
});

tool.get('/generate_code', function (req, res) {
    return res.json({ result: 'abc' });

    var fs = require('fs');

    var moment = require('moment');

    var d = new Date();
    var code_total = 2000000;
    var chars_set = 'ABCDEFGHJKLMNOPQRSTUWXYZ23456789';
    var code_prefix = 'W9';
    var code_length = 10;
    var max_possible = 1;

    const s = new Set();
    var stream = fs.createWriteStream(_basepath + 'media/code/code_' + code_prefix + '.txt', { flags: 'a' });
    while (s.size < code_total) {
        if (s.size >= code_total) {
            console.log('End');
            stream.end();
            break;
        }
        let code = helpers.base.random(code_length, chars_set);
        s.add(code_prefix + code);
        stream.write(code_prefix + code + '\n');
    }
    var e = new Date();
    return res.json({ result: '1' });
});

async function process_save_excel_many(file_name) {
    var dir = _basepath + '/media/wps/' + file_name + '.txt';
    var arr = [];
    var tempFilePath = _basepath + 'media/wps/excel/' + file_name + '.xlsx';
    var options = {};
    options.filename = tempFilePath;
    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    var worksheet = null;
    var num = 0;
    const MAX_RECORD = 1000000;

    //first
    worksheet = workbook.addWorksheet('Report Sheet ' + Math.ceil(num / MAX_RECORD));
    worksheet.columns = [{ header: 'code', key: 'code', width: 50 }];
    worksheet.state = 'visible';

    var lr = new LineByLineReader(dir);
    lr.on('error', function (err) {
        console.log('err', err);
    });

    lr.on('line', function (line) {
        line = line.trim();
        if (line && line.length > 0) {
            console.log(line);
            worksheet.addRow({ code: line }).commit();
        }
    });

    lr.on('end', function () {
        workbook
            .commit()
            .then(() => {
                console.log('END', file_name);
                return true;
            })
            .catch((e) => {
                console.log(e);
                return false;
            });
    });
    return true;
}
tool.get('/drop-index/:id', tool.valid, async function (req, res) {
    try {
        var collect_name = req.params.id;

        if (collect_name === undefined) {
            return res.send('Missing param collection: /abc');
        }

        // fields['createdAt'] = -1;

        var cur_mrd_db = mongoose.connection.db;
        //Tao collection
        try {
            var collection = await cur_mrd_db.collection(collect_name);

            collection.dropIndexes(function (err, results) {
                // Handle errors
                console.log(results, 'results');
                if (err) {
                    res.send(err);
                }
            });

            var indexes = await collection.indexes();
            res.send(indexes);
            //     }
            // });
        } catch (e) {
            res.send(e.message);
        }
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = tool;
