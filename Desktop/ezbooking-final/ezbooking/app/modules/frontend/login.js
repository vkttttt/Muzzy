var express = require("express");
var loginRoute = express.Router();
var Joi = require("joi");
var passport = require("passport");
var ezbookingModel = require("../ezbooking/models");
var mod_config = {
  module: "ezbooking",
  resource: "users",
  collection: "ezbookingUsers",
  route: "ezbooking/users",
  view: "users",
  alias: "users",
};

var mdw = function (req, res, next) {
  var flag = true;
  if (
    typeof req.body.username === "undefined" ||
    typeof req.body.password === "undefined" ||
    req.body.username.trim() == "" ||
    req.body.password.trim() == ""
  ) {
    req.flash("msg_error", "Username or Password must be not null");
    flag = false;
  }

  return flag ? next() : helpers.base.redirect(res, "login");
};

loginRoute.get("/", function (req, res) {
  if (req.session.userdata) {
    return helpers.base.redirect(res, "");
  }

  let dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);

  return res.render("./frontend/login", dataView);
});

//post login
loginRoute.post("/", async function (req, res) {
  req.flash("post_data", req.body);
  //var captcha = await helpers.admin.check_recaptcha(req.body['g-recaptcha-response']);
  //if(captcha && captcha.success){
  var username = req.body.username;
  var password = req.body.password;
  var validator = new helpers.validate();
  validator.isFormatUsername(username, "Username incorrect");
  validator.isFormatPassword(password, "Password incorrect");
  var errors = validator.hasErrors();
  if (errors && errors.length > 0) {
    req.flash("msg_error", errors);
  } else {
    let where = { username: username };
    var user = await ezbookingModel.findOne("ezbookingUsers", where);
    if (user) {
      //console.log("login success");
      var otime = new Date();
      if (user.login_incorrect >= appConfig.login.incorrect) {
        var time_block = user.login_time;
        var current_time = otime.getTime();
        var remand_time = current_time - time_block;
        if (remand_time >= appConfig.login.block_time) {
          //reset time block
          await ezbookingModel.update("ezbookingUsers", where, {
            login_incorrect: 0,
            login_time: 0,
          });
        } else {
          //blocking
          req.flash("msg_error", "Account is blocking");
          return helpers.base.redirect(res, "login");
        }
      }

      //check password
      var h_password = helpers.admin.hash_password(password);
      //console.log(h_password);
      //console.log(user.status);
      if (user.password == h_password) {
        if (user.status === true) {
          //get permission
          //var permissions = [];
          //if(user.role != 'root'){
          //permissions = await adminModel.findAll('adminPermissions',{'role' : user.role},'-_id role module resource permissions');
          //}

          //set data login to session
          req.session.userdata = {
            user_id: user._id,
            username: user.username,
            fullname: user.fullname,
            phone: user.phone,
            avatar: user.avatar,
          };

          await ezbookingModel.update("ezbookingUsers", where, {
            login_incorrect: 0,
            login_time: otime.getTime(),
          });
          helpers.log.tracking(req);
          req.flash("msg_success", "Login success");
        } else {
          req.flash("msg_error", "Account is disable");
        }
      } else {
        await ezbookingModel.update("ezbookingUsers", where, {
          $inc: { login_incorrect: 1 },
          login_time: otime.getTime(),
        });
        req.flash("msg_error", "Tài khoản hoặc mật khẩu không đúng");
      }
    } else {
      req.flash("msg_error", "Tài khoản hoặc mật khẩu không đúng");
    }
  }
  //}
  //else {
  //req.flash('msg_error', 'Please confirm you are not robot !');
  //}
  return helpers.base.redirect(res, "login");
});

module.exports = loginRoute;
