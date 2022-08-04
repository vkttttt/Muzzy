let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	gift_id:String,
	gift_name:String,
	code:String,
	status:String,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingVouchers',objSchema,'ezbookingVouchers'); // model name, schema name, collection name
