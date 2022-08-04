let mongoose = require("mongoose");
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema(
  {
    id: String,
    user_id: String,
    branch_id: String,
    branch_name: String,
    orderId: String,
    payment_type: String,
    amount: Number,
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
  "ezbookingPayments",
  objSchema,
  "ezbookingPayments"
); // model name, schema name, collection name
