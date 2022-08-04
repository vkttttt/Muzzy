const { string } = require("joi");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
// create a schema

let objSchema = new Schema(
  {
    restaurant_id: String,
    collection_name: String,
    category: String,
    name: String,
    description: String,
    thumbnail: String,
    gallery: String,
    address: String,
    province: String,
    district: String,
    reservation_fee: Number,
    min_slot: Number,
    open_time: String,
    close_time: String,
    lat: Number,
    lng: Number,
    hotline: String,
    facebook: String,
    instagram: String,
    website: String,
    rate: Number,
    rate_total: Number,
    is_hot: Boolean,
    status: {
      type: Boolean,
      default: true,
    },
    update_by: String,
  },
  { timestamps: true }
);

//Create a model using it
module.exports = mongoose.model(
  "ezbookingBranchs",
  objSchema,
  "ezbookingBranchs"
); // model name, schema name, collection name
