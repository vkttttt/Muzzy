let mongoose = require("mongoose");
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema(
  {
    restaurant_id: String,
    branch_id: String,
    floor_id: String,
    slot: String,
    position_x: String,
    position_y: String,
    status: String,
    update_by: String,
  },
  { timestamps: true }
);

//Create a model using it
module.exports = mongoose.model(
  "ezbookingTables",
  objSchema,
  "ezbookingTables"
); // model name, schema name, collection name
