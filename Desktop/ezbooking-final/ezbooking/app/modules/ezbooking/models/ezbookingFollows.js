let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	user_id:String,
	branch_id:String,
	restaurant_id:String,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingFollows',objSchema,'ezbookingFollows'); // model name, schema name, collection name
