const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UrlSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    randomId: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Url = mongoose.model("urls", UrlSchema);
