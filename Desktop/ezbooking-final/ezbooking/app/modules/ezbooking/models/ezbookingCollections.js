let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// create a schema
let objSchema = new Schema({
	name:String,
	thumbnail:String,
	promotions:String,
	total_branchs:{
		type: Number,
    	default: 0
	},
	branch_list:{
		type: Array
	},
	status:{
		type: Boolean,
		default: true
	},
	is_hot:Boolean,
	update_by:String,
},{timestamps:true});

//Create a model using it
module.exports = mongoose.model('ezbookingCollections',objSchema,'ezbookingCollections'); // model name, schema name, collection name
