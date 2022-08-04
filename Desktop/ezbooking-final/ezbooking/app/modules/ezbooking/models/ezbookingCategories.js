let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	name:String,
	thumbnail:String,
	total_branch:String,
	status:Boolean,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingCategories',objSchema,'ezbookingCategories'); // model name, schema name, collection name
