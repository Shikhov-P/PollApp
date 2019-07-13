const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChoiceSchema = new Schema({
    os: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
});

const Choice = mongoose.model('Choice', ChoiceSchema);

module.exports = Choice;
