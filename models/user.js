const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const User = new Schema({
    user: {
        type: String,
        required: true
    },
    stats: {
        type: Object
    },
    games: {
        type: Object
    }
});

module.exports = mongoose.model('User', User);;