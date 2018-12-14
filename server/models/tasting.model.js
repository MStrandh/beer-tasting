const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let TastingSchema = new Schema({
		name: {type: String, required: true},
		is_active: {type: Boolean, required: false, default: false},
		current_beer: {type: Number, required: false, default: 0},
		beers: [
			{ type: mongoose.Schema.ObjectId, ref: 'Beers' }
		]
	},
	{ timestamps: true }
);


// Export the model
module.exports = mongoose.model('Tastings', TastingSchema);