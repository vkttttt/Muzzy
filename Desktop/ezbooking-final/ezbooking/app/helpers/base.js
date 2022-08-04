var request = require('request');
const JSONbigString = require('json-bigint')({'storeAsString' : true});
var moment = require('moment');
var fs = require('fs');
var helper = {};

/**
 *
 * @param res
 * @param path
 */
helper.redirect = function(res, path){
    path = (path) ? path.replace(_baseUrl, '') : '';
    res.redirect(_baseUrl + path);
    res.end();
};

/**
 *
 * @param originalUrl
 * @returns {Promise}
 */
helper.parse_resource = function(originalUrl){
    var routes = {'module' : '','resource' : '','method' : ''};
    try{
        originalUrl = originalUrl.replace(appConfig.prefix, "");
        originalUrl = originalUrl.split('?')[0];
        originalUrl = originalUrl.replace(/(\/|\?)/g, " ").trim().split(" ");
        routes.module = (typeof originalUrl[0] != 'undefined') ? originalUrl[0] : '';
        routes.resource = (typeof originalUrl[1] != 'undefined') ? originalUrl[1] : '';
        routes.method = (typeof originalUrl[2] != 'undefined') ? originalUrl[2] : 'view';
        return routes;
    }catch(e){
        console.log('parse_resource',e.message);
        return routes;
    }
};

/**
 * Convert array to array unique
 * @param array
 * @returns {*}
 */
helper.arrayUnique = function(array){
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};

helper.arrayContainsArray = function(needle, haystack){
    for(var i = 0; i < needle.length; i++){
        if(haystack.indexOf(needle[i]) === -1)
            return false;
    }
    return true;
};

/** Find name in array by _id
 *
 * @param _id
 * @param arr
 * @returns boolean | string
 */
helper.findNameByID = function(_id,arr){
    try {
        var result = '';
        if(_id !== null && typeof _id === 'object' && _id.constructor !== Array){
            result = [];
            _id.forEach(function(id){
                arr.some(function(element){
                    if(element._id == id){
                        result.push(element.name);
                        return true;
                    }
                    return false;
                });
            });
        } else {
            arr.some(function(element){
                if(element._id == _id){
                    result = element.name;
                    return true;
                }
                return false;
            });
        }
        return result;
    } catch(e) {
        return '';
    }
};

/** Request sync
 *
 * @param params :
 *      url
 *      method
 *      data | null
 */
helper.http_request = function (params) {
    return new Promise(function (resolve, reject) {
        //call request
        if (!params.url) reject(false);

        let options = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=utf-8',
                'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; pl; rv:1.9.2.13) Gecko/20101203 Firefox/3.5.13',
                'Cookie': 'sagree=true; JSESSIONID=9EC7D24A64808F532B1287FFDDCDEC44',
                'X-Requested-With': 'XMLHttpRequest'
            }
        };

        if (typeof params.headers === 'object') {
            options.headers = Object.assign(options.headers, params.headers);
        }

        options.url = params.url;
        if (params.method == "POST") {
            options.method = "POST";
            options.json = true;
            options.body = params.data;
            if (options.headers['Content-type'].indexOf('application/x-www-form-urlencoded') > -1) {
                options.json = false;
                options.form = params.data;
            }
        }

        if (appConfig.http_proxy != '') {
            options.proxy = appConfig.http_proxy;
        }

        request(options, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                try {
                    resolve(JSONbigString.parse(body));
                } catch (e) {
                    resolve(body);
                }
            } else {
                resolve(err);
            }
        });
    });
};

helper.random = function(length, chars){
    var crypto = require('crypto');
    chars = chars || 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
    var rnd = crypto.randomBytes(length), value = new Array(length), len = Math.min(256, chars.length), d = 256 / len;
    for (let i = 0; i < length; i++) {
        value[i] = chars[Math.floor(rnd[i] / d)]
    }
    return value.join('');
};

helper.format_date = function (strDate, strformat= 'YYYY-MM-DD HH:mm:ss') {
    var date_format = new Date(strDate);
    return moment(date_format).format(strformat);
};

/** Remove special chars
 *
 * @param str String
 * @param special String
 * @returns String
 */
helper.removeSpecialChars = function(str,special){
    if(typeof str != 'string' || typeof special != 'string' ) return str;
    var regex = '';
    for(let i=0;i<special.length;i++){
        regex += (i < special.length - 1) ? this.escapeFunc(special[i])+'|' :  this.escapeFunc(special[i]);
    }
    return str.replace(new RegExp(regex,'g'), '');
}

/** Add slash to special chars
 *
 * @param str String
 * @returns String
 */
helper.escapeFunc = function(string){
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

/** Get email html template and replace data
 *
 * @param mail_template String : name email in public/frontend/email/
 * @param data_replace Array : [{key:'',data:''}];
 * @returns String
 */
helper.getEmailTemplate = async function(mail_template,data_replace){
    try {
        var template = fs.readFileSync(_basepath + 'public/frontend/email/'+mail_template+'.html', { encoding: 'utf-8' });
        var escapeFunc = function(string){
            return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
        data_replace.forEach(function(item){
            var regex = new RegExp(escapeFunc(item.key),'g');
            template = template.replace(regex, item.data);
        });
        return template;
    } catch(e) {
        console.log(e);
        return null;
    }
};

/**
 *
 * @param data Object
 *          form : sender address
 *          to : list of receivers
 *          subject : Subject line
 *          html : plain text body
 * @returns {Promise|any|Promise<T>}
 */
helper.sendMailByGmail = function(data){
    return new Promise((resolve, reject) => {
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'pakadin404@gmail.com',
                pass: 'orghwzgaslwtvgco',
            },
            proxy: appConfig.http_proxy
        });

        const mailOptions = {
            from : data.from,
            to : data.to,
            subject: data.subject,
            html: data.html
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                resolve(err);
            else
                resolve(true);
        });
    })
};

helper.get_data_flash = function(req) {
    return {
        msg_success: req.flash('msg_success'),
        msg_warning: req.flash('msg_warning'),
        msg_error: req.flash('msg_error'),
        valid_errors: req.flash('valid_errors'),
        post_data: req.flash('post_data'),
    };
};

module.exports = helper;

