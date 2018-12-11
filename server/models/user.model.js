const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String, required: true, max: 128},
    name: {type: String, required: false, max: 128},
    fingerprint: {type: String, required: false, max: 128},
});


// Export the model
module.exports = mongoose.model('Users', UserSchema);