var express = require("express");
const bodyParser = require("body-parser");

var adminModel = require("../admin/models");

var ezbookingModel = require("../ezbooking/models");

var blogs = express();

blogs.set("views", _basepath + "app/views");

var mod_config = {
  module: "ezbooking",
  resource: "blogs",
  collection: "ezbookingBlogs",
  route: "blogs",
  view: "blogs",
  alias: "blogs",
};
//-----------home-----------------------
blogs.get("/", async function (req, res) {
  var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
  var sort = {
    is_hot: -1,
    createdAt: -1,
  };
  dataView.ez_blogdata = await ezbookingModel.findAll(
    "ezbookingBlogs",
    { status: true },
    "",
    sort
  );
  res.render("frontend/blogs", dataView);
});

blogs.get("/:_id", async function (req, res) {
  try {
    var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
    var record = await ezbookingModel.findOne(mod_config.collection, {
      _id: req.params._id,
    });
    var sort = {
      is_hot: -1,
      createdAt: -1,
    };
    dataView.ez_blogdata = await ezbookingModel.findAll(
      "ezbookingBlogs",
      { status: true },
      "",
      sort
    );
    dataView.blog = record;
    if (record) {
      return res.render("frontend/blogdetail", dataView);
    } else {
      req.flash("msg_error", "Not found blog");
    }
  } catch (e) {
    req.flash("msg_error", e.message);
    return helpers.base.redirect(res, mod_config.route);
  }
});

module.exports = blogs;
