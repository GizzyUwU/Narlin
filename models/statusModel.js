const mongoose = require('mongoose');
const statusSchema = mongoose.Schema({
        status: String,
})

module.exports = mongoose.model('Status', statusSchema);