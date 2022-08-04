let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	province_id:String,
	province_name:String,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingProvinces',objSchema,'ezbookingProvinces'); // model name, schema name, collection name
