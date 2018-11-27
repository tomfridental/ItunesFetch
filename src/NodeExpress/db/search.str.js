const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const SearchSchema = new Schema({
    searchStr: { type: String, required: true, unique: true },
    count: {type: Number}
}, { timestamps: true });


module.exports = mongoose.model('Top_Searched_Itunes_Str', SearchSchema);
