var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Dummy basic schema for storing tweet in MongoDB
module.exports.Tweet = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
        dropDups: true
    },
    text: String,
    user: {
        id: Number,
        name: String,
        screen_name: String
    }
}, {
    strict: false
});