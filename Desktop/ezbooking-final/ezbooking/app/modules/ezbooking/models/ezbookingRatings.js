let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	user_id:String,
	order_id:String,
	restaurant_id:String,
	branch_id:String,
	rate:Number,
	image:String,
	comment:String,
	date:String,
	status:Boolean,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingRatings',objSchema,'ezbookingRatings'); // model name, schema name, collection name
