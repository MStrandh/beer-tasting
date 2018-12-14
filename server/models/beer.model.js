const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const Schema = mongoose.Schema;

let BeerSchema = new Schema({
		name: {type: String, required: true},
		brewery: {type: String, required: false},
		systembolaget_artno: {type: Number, required: false}
	},
	{ timestamps: true }
);

BeerSchema.plugin(random);


// Export the model
module.exports = mongoose.model('Beers', BeerSchema);