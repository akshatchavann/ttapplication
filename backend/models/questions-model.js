const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: { type: String, required: true },
    bio: { type: String, required: true },
    category: { type: String, required: true },
    answers: { type: Array, required: true },
    tweetboolean: { type: Boolean, required: true },
    tweetURL: { type: String, required: false },
    contentboolean: { type: Boolean, required: true },
    contentURL: { type: String, required: false},
    left: { type: String, required: true },
    mid: { type: String, required: true },
    right: { type: String, required: true },
});


module.exports = mongoose.model('Question', questionSchema);