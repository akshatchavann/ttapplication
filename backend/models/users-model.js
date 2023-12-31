const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    questions: { type: Array, required: false },
    answers: { type: Array, required: false },
    QnA: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        answer: { type: String, required: true }
    }],
    questionindex: { type: Number, required: false },
});

module.exports = mongoose.model('User', userSchema);