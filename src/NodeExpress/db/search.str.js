const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const SongSearch = new Schema({
    name: { type: String, required: true, unique: true },
    count: {type: Number}
}, { timestamps: true });


module.exports = mongoose.model('SongSearch', SongSearch);
