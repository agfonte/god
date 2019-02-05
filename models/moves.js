const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const Moves = new Schema({
    move: {
        type: Array,
    }
});

module.exports = mongoose.model('Move', Moves);;