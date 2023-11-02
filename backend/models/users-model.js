const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    QnA: {
        type: Map,  // Define QnA as a map
        of: String  // Specify that the values will be strings
    }
});

module.exports = mongoose.model('User', userSchema);