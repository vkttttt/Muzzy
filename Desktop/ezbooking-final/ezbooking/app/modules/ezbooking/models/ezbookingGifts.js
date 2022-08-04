let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	gift_name:String,
	discount:String,
	max_value:String,
	campaign:String,
	quota:Number,
	current:Number,
	status:Boolean,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingGifts',objSchema,'ezbookingGifts'); // model name, schema name, collection name
