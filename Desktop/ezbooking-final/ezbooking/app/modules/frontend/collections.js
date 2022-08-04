var express = require("express");
const bodyParser = require("body-parser");

var adminModel = require("../admin/models");

var ezbookingModel = require("../ezbooking/models");

var collections = express();

collections.set("views", _basepath + "app/views");

var mod_config = {
  module: "ezbooking",
  resource: "collections",
  collection: "ezbookingCollections",
  route: "collections",
  view: "collections",
  alias: "collections",
};
//-----------home-----------------------
collections.get("/", async function (req, res) {
  var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
  var sort = {
    is_hot: -1,
    createdAt: -1,
  };
  dataView.ez_collectiondata = await ezbookingModel.findAll(
    "ezbookingCollections",
    { status: true },
    "",
    sort
  ); //{
  res.render("frontend/collections", dataView);
});

collections.get("/:_id", async function (req, res) {
  try {
    var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
    var record = await ezbookingModel.findOne(mod_config.collection, {
      _id: req.params._id,
    });
    dataView.collection = record;
    var branch_list = await ezbookingModel.findAll("ezbookingBranchs", {
      collection_name: record.name,
    });
    dataView.branch_list = branch_list;
    if (record) {
      return res.render("frontend/collectiondetail", dataView);
    } else {
      req.flash("msg_error", "Not found collection");
    }
  } catch (e) {
    req.flash("msg_error", e.message);
    return helpers.base.redirect(res, mod_config.route);
  }
});

module.exports = collections;
