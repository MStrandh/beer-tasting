const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    fingerprint: {type: String, required: false},
});


// Export the model
module.exports = mongoose.model('Users', UserSchema);