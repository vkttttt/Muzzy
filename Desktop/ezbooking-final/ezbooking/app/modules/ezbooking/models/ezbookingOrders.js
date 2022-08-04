let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	user_id:String,
	restaurant_id:String,
	branch_id:String,
	fullname:String,
	phone:String,
	email:String,
	time:String,
	table_list: Array,
	slot:String,
	booking_cost:Number,
	is_rating:Boolean,
	is_paid:Boolean,
	voucher_id:String,
	note:String,
	status:Number,
	allow_cancel:Boolean,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingOrders',objSchema,'ezbookingOrders'); // model name, schema name, collection name
