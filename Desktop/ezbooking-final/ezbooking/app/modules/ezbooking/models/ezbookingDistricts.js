let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	province_id:String,
	province_name:String,
	district_id:String,
	district_name:String,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingDistricts',objSchema,'ezbookingDistricts'); // model name, schema name, collection name
