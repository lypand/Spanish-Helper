const mongoose = require('mongoose');
const { Schema } = mongoose;

const vocab_entries = new Schema({
    spanish: String,
    english: Array,
    exampleEnglish: Array,
    exampleSpanish: Array,
    conjugations: Array,
})

module.exports = mongoose.model('vocab_entries', vocab_entries, "vocab_entries")