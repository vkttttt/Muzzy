var express = require("express");

var adminModel = require("../admin/models");

var ezbookingModel = require("../ezbooking/models");

var frontend = express();

frontend.set("views", _basepath + "app/views");

//-----------home-----------------------
frontend.get("/", async function (req, res) {
  var dataView = helpers.ezbooking.get_data_view_ezbooking(req);
  //console.log("user: ",dataView.user_id);
  var sort = {
    is_hot: -1,
    createdAt: -1,
  };
  var limit = 8;
  dataView.ez_branchdata = await ezbookingModel.find(
    "ezbookingBranchs",
    { status: true },
    "",
    sort,
    limit
  ); //{
  dataView.ez_collectiondata = await ezbookingModel.find(
    "ezbookingCollections",
    { status: true },
    "",
    sort,
    limit
  );
  dataView.ez_blogdata = await ezbookingModel.find(
    "ezbookingBlogs",
    { status: true },
    "",
    sort,
    limit
  );

  res.render("frontend/index", dataView);
});

//-----------login/register--------------
frontend.use("/login", require("./login"));
frontend.use("/register", require("./register"));
frontend.get("/logout", function (req, res) {
  req.session.userdata = null;
  return helpers.base.redirect(res, "login");
});
frontend.use("/profile", require("./profile"));
frontend.use("/branchs", require("./branchs"));
frontend.use("/collections", require("./collections"));
frontend.use("/blogs", require("./blogs"));
frontend.use("/payment", require("./payment"));
//-----------

module.exports = frontend;
