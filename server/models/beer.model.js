const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BeerSchema = new Schema({
		name: {type: String, required: true},
		brewery: {type: String, required: false},
		systembolaget_artno: {type: Number, required: false}
	},
	{ timestamps: true }
);


// Export the model
module.exports = mongoose.model('Beers', BeerSchema);