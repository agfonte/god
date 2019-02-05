const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const Game = new Schema({
    top: {
        type: Number,
        default: 5
    }
});

module.exports = mongoose.model('Game', Game);