const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    dices: {
        type: String,
        required: 'dices cannot be blank'
    },
    time: {
        type: Date,
        required: 'time  cannot be blank'
    }
}, { collection: 'history' });

module.exports = mongoose.model('history', taskSchema);