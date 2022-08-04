let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	status:String,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingsStatistics',objSchema,'ezbookingsStatistics'); // model name, schema name, collection name
