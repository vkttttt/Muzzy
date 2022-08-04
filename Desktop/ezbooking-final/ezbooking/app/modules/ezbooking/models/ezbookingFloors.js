let mongoose = require("mongoose");
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema(
  {
    branch_id: String,
    floor_name: String,
    height: Number,
    width: Number,
    update_by: String,
  },
  { timestamps: true }
);

//Create a model using it
module.exports = mongoose.model(
  "ezbookingFloors",
  objSchema,
  "ezbookingFloors"
); // model name, schema name, collection name
