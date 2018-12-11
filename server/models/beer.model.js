const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BeerSchema = new Schema({
		name: {type: String, required: true, max: 100},
		brewery: {type: String, required: false, max: 100},
		systembolaget_artno: {type: Number, required: false, max: 100},
	},
	{ timestamps: true }
);


// Export the model
module.exports = mongoose.model('Beers', UserSchema);