const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    ip_adresses: {
        type: Array
    }
})

module.exports = mongoose.model('Poll', schema)