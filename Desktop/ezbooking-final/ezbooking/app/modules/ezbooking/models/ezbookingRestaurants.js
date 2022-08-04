let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	name:String,
	menu:String,
	update_by:String
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingRestaurants',objSchema,'ezbookingRestaurants'); // model name, schema name, collection name
