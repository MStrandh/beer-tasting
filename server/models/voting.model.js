const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let VotingSchema = new Schema({
		tasting: { type: mongoose.Schema.ObjectId, ref: 'Tastings' },
		user: { type: mongoose.Schema.ObjectId, ref: 'Users' },
		beer: { type: mongoose.Schema.ObjectId, ref: 'Beers' },
		tasting_order_no: {type: Number, required: true, default: 0},
		rating: {type: Number, required: true, default: 3},
	},
	{ timestamps: true }
);


// Export the model
module.exports = mongoose.model('Votings', VotingSchema);