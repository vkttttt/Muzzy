var express = require("express");
const bodyParser = require("body-parser");

var adminModel = require("../admin/models");

var ezbookingModel = require("../ezbooking/models");
const helper = require("../../helpers/ezbooking");

var CronJob = require("cron").CronJob;
var branchs = express();

branchs.set("views", _basepath + "app/views");

var mod_config = {
  module: "ezbooking",
  resource: "branchs",
  collection: "ezbookingBranchs",
  route: "branchs",
  view: "branchs",
  alias: "branchs",
};

//-----------home-----------------------
branchs.get("/", async function (req, res) {
  var userdata = req.session.userdata;
  var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
  var province = req.query.province;
  var category = req.query.category;
  var district = req.query.district;
  var ez_branchdata;
  dataView.ez_districtdata = "";

  dataView.ez_categorydata = await ezbookingModel.findAll(
    "ezbookingCategories",
    { status: true },
    "",
    {}
  );
  dataView.ez_provincedata = await ezbookingModel.findAll("ezbookingProvinces");

  var sort = {
    is_hot: -1,
    createdAt: -1,
  };

  var conditions = {
    status: true,
  };
  if (category) {
    conditions["category"] = category;
  }
  if (province) {
    conditions["province"] = province;
    dataView.ez_districtdata = await ezbookingModel.findAll(
      "ezbookingDistricts",
      { province_id: province }
    );
  }
  if (district) {
    conditions["district"] = district;
  }
  ez_branchdata = await ezbookingModel.findAll(
    "ezbookingBranchs",
    conditions,
    "",
    sort
  );

  if (userdata) {
    for (var branch of ez_branchdata) {
      var where = {
        user_id: userdata.user_id,
        branch_id: branch._id,
      };
      var is_follow = await ezbookingModel.findOne("ezbookingFollows", where);
      if (is_follow) {
        branch.is_follow = true;
      } else branch.is_follow = false;
    }
  }
  dataView.ez_branchdata = ez_branchdata;
  dataView.follows = false;
  dataView.hot = false;
  dataView.category = category;
  dataView.province = province;
  dataView.district = district;
  res.render("frontend/branchs", dataView);
});

branchs.get("/search", async function (req, res) {
  var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
  var sort = {
    is_hot: -1,
    createdAt: -1,
  };
  var dataRes = await ezbookingModel.findAll(
    "ezbookingBranchs",
    { status: true },
    "",
    sort
  );
  dataView.dataRes = dataRes;
  res.json(dataView);
});

branchs.get("/hot", async function (req, res) {
  var userdata = req.session.userdata;
  var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
  var province = req.query.province;
  var category = req.query.category;
  var district = req.query.district;
  var ez_branchdata;
  dataView.ez_districtdata = "";

  dataView.ez_categorydata = await ezbookingModel.findAll(
    "ezbookingCategories",
    { status: true },
    "",
    {}
  );
  dataView.ez_provincedata = await ezbookingModel.findAll("ezbookingProvinces");

  var sort = {
    is_hot: -1,
    createdAt: -1,
  };

  var conditions = {
    status: true,
    is_hot: true,
  };
  if (category) {
    conditions["category"] = category;
  }
  if (province) {
    conditions["province"] = province;
    dataView.ez_districtdata = await ezbookingModel.findAll(
      "ezbookingDistricts",
      { province_id: province }
    );
  }
  if (district) {
    conditions["district"] = district;
  }
  ez_branchdata = await ezbookingModel.findAll(
    "ezbookingBranchs",
    conditions,
    "",
    sort
  );

  if (userdata) {
    for (var branch of ez_branchdata) {
      var where = {
        user_id: userdata.user_id,
        branch_id: branch._id,
      };
      var is_follow = await ezbookingModel.findOne("ezbookingFollows", where);
      if (is_follow) {
        branch.is_follow = true;
      } else branch.is_follow = false;
    }
  }
  dataView.ez_branchdata = ez_branchdata;
  dataView.hot = true;
  dataView.follows = false;
  dataView.category = category;
  dataView.province = province;
  dataView.district = district;
  res.render("frontend/branchs", dataView);
});

branchs.get("/follows", async function (req, res) {
  var userdata = req.session.userdata;
  var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
  var province = req.query.province;
  var category = req.query.category;
  var district = req.query.district;
  var branchdata;
  var ez_branchdata = [];
  dataView.ez_districtdata = "";

  dataView.ez_categorydata = await ezbookingModel.findAll(
    "ezbookingCategories",
    { status: true },
    "",
    {}
  );
  dataView.ez_provincedata = await ezbookingModel.findAll("ezbookingProvinces");

  var sort = {
    is_hot: -1,
    createdAt: -1,
  };

  var conditions = {
    status: true,
  };
  if (category) {
    conditions["category"] = category;
  }
  if (province) {
    conditions["province"] = province;
    dataView.ez_districtdata = await ezbookingModel.findAll(
      "ezbookingDistricts",
      { province_id: province }
    );
  }
  if (district) {
    conditions["district"] = district;
  }
  branchdata = await ezbookingModel.findAll(
    "ezbookingBranchs",
    conditions,
    "",
    sort
  );

  if (userdata) {
    for (var branch of branchdata) {
      var where = {
        user_id: userdata.user_id,
        branch_id: branch._id,
      };
      var is_follow = await ezbookingModel.findOne("ezbookingFollows", where);
      if (is_follow) {
        branch.is_follow = true;
        ez_branchdata.push(branch);
      } else branch.is_follow = false;
    }
  }
  dataView.ez_branchdata = ez_branchdata;
  dataView.follows = true;
  dataView.hot = false;
  dataView.category = category;
  dataView.province = province;
  dataView.district = district;
  res.render("frontend/branchs", dataView);
});

branchs.post("/confirm-order", async function (req, res) {
  if (req.body.check_email == 'true'){
    helper.confirmEmail(req.body.email, req.body.token);
  }
  if (req.body.check_sms == 'true') {
    console.log("send sms");
    //helper.sendSMS(req.body.phone, req.body.token);
  }
  
});

branchs.post("/follow", async function (req, res) {
  var userdata = req.session.userdata;
  var post_data = req.body;
  var data = {
    user_id: userdata.user_id,
    branch_id: post_data.branch_id,
    restaurant_id: post_data.restaurant_id,
  };
  await ezbookingModel.create("ezbookingFollows",data);
});

branchs.post("/unfollow", async function (req, res) {
  var userdata = req.session.userdata;
  var post_data = req.body;
  var data = {
    user_id: userdata.user_id,
    branch_id: post_data.branch_id,
  };
  await ezbookingModel.deleteOne("ezbookingFollows",data);
});

branchs.post("/check-voucher", async function (req, res) {
  var voucher = req.body.voucher;
  var where = {
    voucher: voucher,
    status: 0,
  };
  var check_voucher = await ezbookingModel.findOne("ezbookingVouchers",where);
  if (check_voucher) await ezbookingModel.update("ezbookingVouchers", where, {status: 1});
  return true;
});

branchs.get("/:_id", async function (req, res) {
  try {
    var userdata = req.session.userdata;
    var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
    var record = await ezbookingModel.findOne(mod_config.collection, {_id: req.params._id,});
    var dataRate = await ezbookingModel.findAll("ezbookingRatings", {branch_id: req.params._id,});
    var floor_list = await ezbookingModel.findAll("ezbookingFloors", {branch_id: req.params._id,});

    //-------------------------Follow-----------------------------------------
    if (userdata) {
      var where = {
        user_id: userdata.user_id,
        branch_id: record._id,
      };
      var is_follow = await ezbookingModel.findOne("ezbookingFollows", where);
      if (is_follow) {
        dataView.is_follow = true
      } else dataView.is_follow = false;
    }
    
    //-----------------------table plan----------------------------------------------
    for (var floor of floor_list){
      //console.log("floor: ", floor);
      var num_of_table = 0
      var table_active = 0
      floor.table_list = await ezbookingModel.findAll("ezbookingTables", {floor_id: floor._id,});
      for(var tble of floor.table_list){
        tble.ts = JSON.stringify(tble);
        if (tble.slot != 0){
          num_of_table++;
          if (tble.status == 0){
            table_active++;
          }
        }
        
      }
      //var slot_inactive = await ezbookingModel.count("ezbookingTables", {floor_id: floor._id,slot: '0'});
      //console.log("slot_inactive", slot_inactive)
      floor.num_of_table = num_of_table //parseInt(floor.height)*parseInt(floor.width) - slot_inactive;
      floor.table_active = table_active 
    }

    //--------------------------------rating-----------------------------------
    for (var rating of dataRate) {
      var user = await ezbookingModel.findOne("ezbookingUsers", {
        _id: rating.user_id,
      });
      rating.userdata = user;
    }

    dataView.branch = record;
    dataView.dataRate = dataRate;
    dataView.floor_list = floor_list;
    //console.log("floor_list: ",floor_list);
    if (record) {
      return res.render("frontend/branchdetail", dataView);
    } else {
      req.flash("msg_error", "Not found branch");
    }
  } catch (e) {
    req.flash("msg_error", e.message);
    return helpers.base.redirect(res, mod_config.route);
  }
});

branchs.post("/:_id", async function (req, res) {
  var userdata = req.session.userdata;
  if (userdata == null || typeof userdata === "undefined") {
    return helpers.base.redirect(res, "login");
  }
  try {
    var branch = await ezbookingModel.findOne(mod_config.collection, {
      _id: req.params._id,
    });
    
    var table_list = req.body.table
    
    var booking_cost = 0;
    var status = 0;
    var is_paid = false;
    if (req.body.slot > branch.min_slot) {
      booking_cost = req.body.slot * branch.reservation_fee;
    }
    if (booking_cost == 0) {
      status = 1;
    }
    var data = req.body.date + " " + req.body.time;

    var year = Number(data.substr(0, 4));
    var month = Number(data.substr(5, 2));
    var day = Number(data.substr(8, 2));
    var hours = Number(data.substr(11, 2));
    var minutes = Number(data.substr(14, 2));

    var date = new Date();
    date.setDate(day);
    date.setFullYear(year);
    date.setHours(hours);
    date.setMilliseconds(0);
    date.setMinutes(minutes);
    date.setMonth(month - 1);
    date.setSeconds(0);

    // var curentSlot = Number(req.body.slot) + Number(branch.current_slot);

    var orderdata = {
      user_id: userdata.user_id,
      restaurant_id: branch.restaurant_id,
      branch_id: branch._id,
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      slot: req.body.slot,
      table_list: table_list,
      time: data,
      booking_cost: booking_cost,
      is_paid: is_paid,
      is_rating: false,
      status: status,
      allow_cancel: true,
    };
    if (orderdata) {
      // if (curentSlot > branch.slot) {
      //   req.flash("msg_error", "Không đủ chỗ");
      //   return helpers.base.redirect(
      //     res,
      //     mod_config.route + "/" + req.params._id
      //   );
      // } else {
        var create = await ezbookingModel.create("ezbookingOrders", orderdata);
        if (create) {
          //console.log("create: ", create);
          //------------------update table data ----------------------------------------
          for (var item of create.msg.table_list){ 
            var table = item.replace(/&quot;/g, '"')
            table = JSON.parse(table);
            // var temp = item.replace('{',"");
            // temp = temp.replace('}',"");
            // temp = temp.split(',');
            // var table = {};
            // temp.forEach(function(property) {            
            //     var tup = property.split(':');
            //     tup[0] = tup[0].slice(1);
            //     tup[0] = tup[0].slice(0,-1);
            //     tup[1] = tup[1].slice(1);
            //     tup[1] = tup[1].slice(0,-1);
            //     table[tup[0]] = tup[1];
            // });
            //console.log("table: ", table);
            await ezbookingModel.update("ezbookingTables",{_id:table._id},{status:'1'});
            //console.log("item: ", x);
          }
          // -----------------remind-------------------------------------
          // await ezbookingModel.update(
          //   "ezbookingBranchs",
          //   { _id: req.params._id },
          //   { current_slot: curentSlot }
          // );

          var t = minutes + hours * 60 - 15; // nhac nho 15p truoc khi don bat dau
          var h = (t - (t % 60)) / 60;
          var m = t % 60;
          var remindtime = new Date();
          remindtime.setDate(day);
          remindtime.setFullYear(year);
          remindtime.setHours(h);
          remindtime.setMilliseconds(0);
          remindtime.setMinutes(m);
          remindtime.setMonth(month - 1);
          remindtime.setSeconds(0);

          var remind_time =
            "00 " +
            remindtime.getMinutes() +
            " " +
            remindtime.getHours() +
            " " +
            remindtime.getDate() +
            " " +
            remindtime.getMonth() +
            " *";
          console.log("remind time: ", remind_time);
          var link = _baseUrl + "profile/orders/" + create.msg._id;
          var job = new CronJob(
            remind_time,
            async function () {
              var order = await ezbookingModel.findOne("ezbookingOrders",{_id:create.msg._id})
              console.log("remind status", order.status);
              if (order.status == 1){
                helper.sendMailRemind(req.body.email, link);
              }
            },
            function () {
              /* This function is executed when the job stops */
            },
            true /* Start the job right now */,
            "Asia/Ho_Chi_Minh" /* Time zone of this job. */
          );
          //--------------------------------------------------------------------------

          //--------------------Cancle----------------------------------------------
          var t1 = minutes + hours * 60 - 30; // 30p truoc khi don bat dau khong duoc huy
          var h1 = (t1 - (t1 % 60)) / 60;
          var m1 = t1 % 60;
          var canceltime = new Date();
          canceltime.setDate(day);
          canceltime.setFullYear(year);
          canceltime.setHours(h1);
          canceltime.setMilliseconds(0);
          canceltime.setMinutes(m1);
          canceltime.setMonth(month - 1);
          canceltime.setSeconds(0);
      
          var cancel_time =
            "00 " +
            canceltime.getMinutes() +
            " " +
            canceltime.getHours() +
            " " +
            canceltime.getDate() +
            " " +
            canceltime.getMonth() +
            " *";
          console.log("cancel time: ", cancel_time);
          var job = new CronJob(
            cancel_time,
            async function () {
                await ezbookingModel.update(
                  "ezbookingOrders",
                  { _id: create.msg._id },
                  { allow_cancel: false }
                );
            },
            function () {
              /* This function is executed when the job stops */
            },
            true /* Start the job right now */,
            "Asia/Ho_Chi_Minh" /* Time zone of this job. */
          );
          //------------------------------------------------------------------------

          //--------------------disable----------------------------------------------
          var t = date.getTime() + 3 * 60 * 1000; //miliseconds 3 phut khong thanh toan = huy don
          var disable = new Date(t);
          var disable_time =
            "00 " +
            disable.getMinutes() +
            " " +
            disable.getHours() +
            " " +
            disable.getDate() +
            " " +
            disable.getMonth() +
            " *";

          var job = new CronJob(
            disable_time,
            async function () {
              var order = await ezbookingModel.findOne("ezbookingOrders",{_id:create.msg._id})
              //console.log("disable status", order.status);
              if (order.status == 0){
                await ezbookingModel.update(
                  "ezbookingOrders",
                  { _id: create.msg._id },
                  { status: 2 }
                );
                for (var item of create.msg.table_list){ 
                  var table = item.replace(/&quot;/g, '"')
                  table = JSON.parse(table);
                  await ezbookingModel.update("ezbookingTables",{_id:table._id},{status:'0'});
                }
              }
            },
            function () {
              /* This function is executed when the job stops */
            },
            true /* Start the job right now */,
            "Asia/Ho_Chi_Minh" /* Time zone of this job. */
          );
          //------------------------------------------------------------------------
        }
        req.flash("msg_success", "Booking success");
        return helpers.base.redirect(res, "profile/orders");
      }
     else {
      req.flash("msg_error", e.message);
      return helpers.base.redirect(
        res,
        mod_config.route + "/" + req.params._id
      );
    }
  } catch (e) {
    req.flash("msg_error", e.message);
    return helpers.base.redirect(res, mod_config.route);
  }
});
module.exports = branchs;
