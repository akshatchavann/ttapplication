const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailyquestionSchema = new Schema({
    question: { type: String, required: true },
    bio: { type: String, required: true },
    category: { type: Array, required: true },
    answers: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        answer: { type: String, required: true }
    }],
    tweetboolean: { type: Boolean, required: true },
    tweetURL: { type: String, required: false },
    contentboolean: { type: Boolean, required: true },
    contentURL: { type: String, required: false},
    left: { type: String, required: true },
    mid: { type: String, required: true },
    right: { type: String, required: true },
    display: { type: Boolean, required: true },
    creator: { type: String, required: true },
});


module.exports = mongoose.model('DailyQuestion', dailyquestionSchema);