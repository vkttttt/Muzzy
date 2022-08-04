const { application } = require("express");
var express = require("express");
var profileRoute = express.Router();
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

profileRoute.get("/", async function (req, res) {
  var userdata = req.session.userdata;
  if (userdata == null || typeof userdata === "undefined") {
    return helpers.base.redirect(res, "login");
  }
  let record = await ezbookingModel.findOne("ezbookingUsers", {
    username: userdata.username,
  });
  var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
  dataView.data_edit =
    dataView.post_data.length > 0 ? dataView.post_data[0] : record;
  return res.render("./frontend/profile", dataView);
});

//post login
profileRoute.post("/", async function (req, res) {
  var userdata = req.session.userdata;
  if (userdata == null || typeof userdata === "undefined") {
    return helpers.base.redirect(res, "login");
  }

  var post_data = req.body;
  console.log("post_data: ",post_data)
  req.flash("post_data", post_data);
  var validator = new helpers.validate();
  validator.notEmpty(post_data.fullname, "Họ tên không được bỏ trống");
  validator.notEmpty(post_data.phone, "Số điện thoại không được bỏ trống");
  validator.notEmpty(post_data.email, "Email không được bỏ trống");
  var valid_error = validator.hasErrors();
  if (valid_error) {
    req.flash("valid_errors", valid_error);
    return helpers.base.redirect(res, "profile");
  }

  var fullname = helpers.ezbooking.filterXSS(post_data.fullname);
  var phone = helpers.ezbooking.filterXSS(post_data.phone);
  var email = helpers.ezbooking.filterXSS(post_data.email);
  var address = helpers.ezbooking.filterXSS(post_data.address);
  var updateData = {
    fullname: fullname,
    phone: phone,
    email: email,
    address: address,
  };

  if (post_data.update_password == 1) {
    validator.notEmpty(post_data.old_password, "Nhập mật khẩu cũ");
    validator.isFormatPassword(
      post_data.new_password,
      "Mật khẩu phải từ 6-30 ký tự, tối thiểu 1 chữ hoa, 1 chữ thường, 1 chữ số"
    );
    validator.equals(
      post_data.new_password,
      post_data.retype_password,
      "Mật khẩu xác nhận lại không chính xác"
    );
    valid_error = validator.hasErrors();
    if (valid_error) {
      req.flash("valid_errors", valid_error);
      return helpers.base.redirect(res, "profile");
    }

    let user = await ezbookingModel.findOne("ezbookingUsers", {
      username: userdata.username,
    });
    if (user) {
      var old_password = helpers.admin.hash_password(post_data.old_password);
      if (old_password != user.password) {
        req.flash("valid_errors", "Mật khẩu cũ không chính xác.");
        return helpers.base.redirect(res, "profile");
      }
      updateData.password = helpers.admin.hash_password(post_data.new_password);
    } else {
      req.flash("msg_error", "User not found.");
      return helpers.base.redirect(res, "");
    }
  }
  var new_avatar = await helpers.file.writeBase64(
    post_data.new_avatar,
    "media/avatar"
  );
  if (new_avatar) {
    //remove old avatar
    //console.log("new_avatar: ", new_avatar);
    if (userdata.avatar && userdata.avatar.indexOf("media/avatar") !== -1) {
      helpers.file.removeFile(userdata.avatar);
    }
    updateData.avatar = new_avatar;
    //console.log("up_avatar: ", updateData.avatar);
  }

  var conditions = {
    username: userdata.username,
  };

  var update = await ezbookingModel.update(
    "ezbookingUsers",
    conditions,
    updateData
  );
  if (update.status) {
    req.flash("msg_success", "Update profile success");
    req.flash("post_data", null);
    req.session.userdata = null;
    return helpers.base.redirect(res, "login");
  } else {
    req.flash("valid_errors", update.msg);
  }
  return helpers.base.redirect(res, "profile");
});

profileRoute.get("/orders", async function (req, res) {
  var userdata = req.session.userdata;
  if (userdata == null || typeof userdata === "undefined") {
    return helpers.base.redirect(res, "login");
  }
  try {
    var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
    var status = req.query.status;
    var order_id = req.query._id;
    var sort = req.query.sort;
    if(!sort) sort = -1;
    var sort_condition = { 
      createdAt: sort, 
     };
     var conditions = {
      user_id: userdata.user_id
     };
     if (status){
      conditions['status']=status;
      }
    if (order_id){
      conditions['_id']=order_id;
      }
    var ez_bookingdata = await ezbookingModel.findAll("ezbookingOrders", conditions,'',sort_condition);
    for (var order of ez_bookingdata) {
      //console.log(order);
      var branch = await ezbookingModel.findOne("ezbookingBranchs", {
        _id: order.branch_id,
      });
      order.branch = branch;
      order.sstatus = helpers.ezbooking.getStatus(order.status);
    }
    dataView.ez_bookingdata = ez_bookingdata;
    dataView.sort = sort ;
    dataView.status = status;
    return res.render("frontend/orders", dataView);
  } catch (e) {
    req.flash("msg_error", e.message);
    return helpers.base.redirect(res, "index");
  }
});

profileRoute.get("/orders/:_id", async function (req, res) {
  //console.log("order detail");
  var userdata = req.session.userdata;
  if (userdata == null || typeof userdata === "undefined") {
    return helpers.base.redirect(res, "login");
  }
  try {
    where = {
      user_id: userdata.user_id,
      _id: req.params._id,
    };
    var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
    var order = await ezbookingModel.findOne("ezbookingOrders", where);
    var branch = await ezbookingModel.findOne("ezbookingBranchs", {
      _id: order.branch_id,
    });
    order.sstatus = helpers.ezbooking.getStatus(order.status);
    dataView.order = order;
    dataView.branch = branch;
    return res.render("frontend/orderdetail", dataView);
  } catch (e) {
    req.flash("msg_error", e.message);
    return helpers.base.redirect(res, "profile/orders");
  }
});

profileRoute.post("/orders/cancel/:_id", async function (req, res) {
  var userdata = req.session.userdata;
  if (userdata == null || typeof userdata === "undefined") {
    return helpers.base.redirect(res, "login");
  }
  try {
    var where = {
      _id: req.params._id,
      allow_cancel: true,
    };
    // var order = await ezbookingModel.findOne('ezbookingOrders',where);
    // if (order){
      var dataUpdate = {
        allow_cancel: false,
        status:3,
      }
      var order_update = await ezbookingModel.update('ezbookingOrders',where,dataUpdate)
      //---------------update table status--------------------------------
      if(order_update.status){
        console.log("cancel success order: ", order_update)
        var table_list = order_update.msg.table_list;
        for (var item of table_list){ 
          var table = item.replace(/&quot;/g, '"')
          table = JSON.parse(table);
          var table_update = await ezbookingModel.update("ezbookingTables",{_id:table._id},{status:'0'});
          //console.log("table update: ",table_update, "table: ", table);
          if(table_update){
            console.log("update table: ", table._id);
          }
        }
      }
      
      return helpers.base.redirect(res, "profile/orders");
    
    // else {
    //   console.log("Đơn đặt bàn không thể hủy");
    //   return helpers.base.redirect(res, "profile");
    // }
    
  } catch (e) {
    req.flash("msg_error", e.message);
    return helpers.base.redirect(res, "profile");
  }
  
});

profileRoute.get("/orders/rating/:_id", async function (req, res) {
  //console.log("order rating");
  var userdata = req.session.userdata;
  if (userdata == null || typeof userdata === "undefined") {
    return helpers.base.redirect(res, "login");
  }
  try {
    where = {
      user_id: userdata.user_id,
      _id: req.params._id,
    };
    var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
    var order = await ezbookingModel.findOne("ezbookingOrders", where);
    if (order.is_rating || order.status != 4)
      return helpers.base.redirect(res, "profile/orders");
    var branch = await ezbookingModel.findOne("ezbookingBranchs", {
      _id: order.branch_id,
    });
    dataView.order = order;
    dataView.branch = branch;
    return res.render("frontend/rating", dataView);
  } catch (e) {
    req.flash("msg_error", e.message);
    return helpers.base.redirect(res, "profile/orders");
  }
});

profileRoute.post("/orders/rating/:_id", async function (req, res) {
  //console.log("order rating form");
  var userdata = req.session.userdata;
  if (userdata == null || typeof userdata === "undefined") {
    return helpers.base.redirect(res, "login");
  }
  try {
    where = {
      user_id: userdata.user_id,
      _id: req.params._id,
    };
    //console.log("req.body: ",req.body)
    var date = new Date();
    var numrate = parseFloat(req.body.rate);
    var order = await ezbookingModel.findOne("ezbookingOrders", where);
    var branch = await ezbookingModel.findOne("ezbookingBranchs", {'_id': order.branch_id});

    var img_url = await helpers.file.writeBase64(
      req.body.img_base64,
      "media/photo_uploads/rating"
    );
    var ratingdata = {
      user_id: userdata.user_id,
      order_id: req.params._id,
      restaurant_id: branch.restaurant_id,
      branch_id: order.branch_id,
      rate: numrate,
      image: img_url,
      comment: req.body.comment,
      date: date,
      status: true,
    };
    if (ratingdata) {
      var create = await ezbookingModel.create("ezbookingRatings", ratingdata);
      await ezbookingModel.update(
        "ezbookingOrders",
        { _id: order._id },
        { is_rating: true }
      );
      var branch = await ezbookingModel.findOne("ezbookingBranchs", {
        _id: order.branch_id,
      });
      var num = branch.rate * branch.rate_total + numrate;
      var rate_total = branch.rate_total + 1;
      var rate = num / rate_total;
      var dataRate = {
        rate_total: rate_total,
        rate: rate,
      };
      await ezbookingModel.update(
        "ezbookingBranchs",
        { _id: order.branch_id },
        dataRate
      );
      return helpers.base.redirect(res, "profile/orders");
    }
  } catch (e) {
    req.flash("msg_error", e.message);
    return helpers.base.redirect(res, "profile/orders");
  }
});

module.exports = profileRoute;
