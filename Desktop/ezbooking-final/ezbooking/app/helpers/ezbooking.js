var request = require('request');
var moment = require('moment');
var md5 = require('md5');
var querystring = require('querystring');
var pagination = require('pagination');
var fs = require('fs');
var ezbookingModel = require('../modules/ezbooking/models');
const nodemailer =  require('nodemailer');

const Nexmo = require('nexmo')
const nexmo = new Nexmo({
  apiKey: '00fd315b',
  apiSecret: 'mAejfHgeObcqze3O'
})

var helper = {};

helper.authUser = async function (req, res, next) {
    var userdata = req.session.userdata;
    if (typeof userdata === 'undefined' || userdata === null) {
        return helpers.base.redirect(res, 'auth/login');
    }

    if (!appConfig.role_systems) {
        //get role in db and set variable global
        //appConfig.role_systems = [];
        //var roles = await adminModel.findAll('adminRoles', { role: { $ne: 'root' } });
        //roles.forEach(function (field) {
           // appConfig.role_systems.push(field.role);
        //});
    }

    //if (userdata.role == 'root') {
        //if (req.body._csrf !== undefined) delete req.body._csrf;
        //helpers.log.tracking(req);
        //return next();
    //}

    //var originalUrl = req.originalUrl;
    //var resources = helpers.base.parse_resource(originalUrl);
    //var list_perms = req.session.userdata.list_perms;
    //var perms = [];
    //list_perms.forEach(function (per) {
        //if (resources.module == per.module && resources.resource == per.resource) {
            //perms = per.permissions;
        //}
    //});

    //set perms for resource using display button add,edit,delete ...
    //req.session.userdata.perms = perms;

    //if (perms) {
        //if (perms.indexOf(resources.method) != -1) {
            //if (req.body._csrf !== undefined) delete req.body._csrf;
            //helpers.log.tracking(req);
            //return next();
        //} else {
            //return req.method == 'POST' ? res.status(200).send('No Permission') : helpers.base.redirect(res, 'admin/no_permission');
        //}
    //} else {
        //return req.method == 'POST' ? res.status(200).send('No Permission') : helpers.base.redirect(res, 'admin/no_permission');
    //}
};

helper.get_data_view_ezbooking = function (req, mod_config = null) {
    return {
        title: 'EzBooking',
        fullname: req.session.userdata ? req.session.userdata.fullname : '',
        avatar: req.session.userdata ? req.session.userdata.avatar : '',
        username: req.session.userdata ? req.session.userdata.username : '',
        role: req.session.userdata ? req.session.userdata.role : '',
        user_id: req.session.userdata ? req.session.userdata.user_id : '',
        msg_success: req.flash('msg_success'),
        msg_warning: req.flash('msg_warning'),
        msg_error: req.flash('msg_error'),
        valid_errors: req.flash('valid_errors'),
        post_data: req.flash('post_data'),
        mod_module: mod_config ? mod_config.module : '',
        mod_route: mod_config ? mod_config.route : '',
        mod_resource: mod_config ? mod_config.resource : '',
        mod_alias: mod_config ? mod_config.alias : '',
        mod_url: mod_config ? _baseUrl + mod_config.route : '',
    };
};

helper.get_query_data = function (data, field) {
    var value = '';
    if (data === null || typeof data != 'object' || !field) {
        return value;
    }
    try {
        if (data[field] !== undefined) {
            value = data[field];
        } else if (typeof data[0] !== 'undefined') {
            value = data[0][field];
        }
        return this.filterXSS(value);
    } catch (e) {
        console.log(e);
        return this.filterXSS(value);
    }
};

helper.filterXSS = function (data) {
    try {
        if (typeof data === 'object') {
            for (const prop1 in data) {
                if (typeof data[prop1] === 'object') {
                    for (const prop2 in data[prop1]) {
                        data[prop1][prop2] = this.htmlEscape(data[prop1][prop2]);
                    }
                } else {
                    data[prop1] = this.htmlEscape(data[prop1]);
                    //console.log(`obj.${prop} = ${obj[prop]}`);
                }
            }
        } else {
            data = this.htmlEscape(data);
        }
        return data;
    } catch (e) {
        return {};
    }
};

helper.htmlEscape = function (text) {
    if (typeof text != 'string') return text;

    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;') // it's not neccessary to escape >
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

helper.getStatus = function (status){
    var status_obj = {0: "Đang xử lý", 1: "Thành công", 2: "Thất bại", 3: "Hủy", 4: "Hoàn thành"}
    return status_obj[status];
};

helper.confirmEmail = function(email,token){
    
    //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
    var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ezbooking.reservation@gmail.com', 
            pass: 'Duyen0304' 
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Xác nhận đơn đặt bàn</h4>
                <span style="color: black">Mã xác nhận: ` + token +`</span>
            </div>
        </div>
    `;
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'EzBooking',
        to: email,
        subject: 'Xác nhận đơn đặt bàn',
        text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            //req.flash('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
            return false
        } else {
            console.log('Message sent: ' +  info.response);
            //req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
            return true;
        }
    });
};

helper.sendMailRemind = function(email,link){
    
    //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
    var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ezbooking.reservation@gmail.com', 
            pass: 'Duyen0304' 
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Bạn có lịch đặt bàn nhà hàng bắt đầu trong 15 phút nữa</h4>
                <span style="color: black">Chi tiết đơn đặt bàn: ` + link + `</span>
            </div>
        </div>
    `;
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'EzBooking',
        to: email,
        subject: 'Nhắc nhở đặt bàn',
        text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            req.flash('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
            return false
        } else {
            console.log('Message sent: ' +  info.response);
            //req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
            return true;
        }
    });
};
helper.getDateTime = function(data){ // data: 2021-10-03 10:07
    var year = Number(data.substr(0,4));
    var month = Number(data.substr(5,2));
    var day = Number(data.substr(8,2));
    var hours = Number(data.substr(11,2));
    var minutes = Number(data.substr(14,2));

    var date = new Date();
    date.setDate(day);
    date.setFullYear(year);
    date.setHours(hours);
    date.setMilliseconds(0);
    date.setMinutes(minutes);
    date.setMonth(month);
    date.setSeconds(0);

    if(date) return date;
    else return 0;
};
helper.sendSMS = function(toPhone, token){
    var content = "Mã xác nhận đơn hàng của bạn: " + token;
    console.log("toPhone: ", toPhone);
    nexmo.message.sendSms("Nexmo", toPhone, content, {
        type: "unicode"
      }, (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.")
          } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
          }
        }
      })
}

module.exports = helper;