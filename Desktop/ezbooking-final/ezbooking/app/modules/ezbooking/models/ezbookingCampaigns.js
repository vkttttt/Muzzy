let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	name:String,
	description:String,
	apply_for:String,
	start_date:String,
	end_date:String,
	status:Boolean,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingCampaigns',objSchema,'ezbookingCampaigns'); // model name, schema name, collection name
