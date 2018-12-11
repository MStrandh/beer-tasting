const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
		email: {type: String, required: true},
		name: {type: String, required: false},
		fingerprint: {type: String, required: false},
	},
	{ timestamps: true }
);


// Export the model
module.exports = mongoose.model('Users', UserSchema);