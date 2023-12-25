const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reccSchema = new Schema({
    topic : { type: String, required: false },
    questions: { type: String, required: false },
    links: { type: String, required: false },
});

module.exports = mongoose.model('Recc', reccSchema);