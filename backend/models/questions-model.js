const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: { type: String, required: true },
    category: { type: String, required: true },
    answers: { type: Array, required: true },
});


module.exports = mongoose.model('Question', questionSchema);