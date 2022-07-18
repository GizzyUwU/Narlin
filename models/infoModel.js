const mongoose = require('mongoose');
const warnSchema = mongoose.Schema({
        userId: String,
        msg: String,
        timestamp: String,
})

module.exports = mongoose.model('Info', warnSchema);