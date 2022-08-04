let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	title:String,
	thumbnail:String,
	content:String,
	view:String,
	is_hot:Boolean,
	status:Boolean,
	update_by:String,
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingBlogs',objSchema,'ezbookingBlogs'); // model name, schema name, collection name
