const mongoose = require('mongoose')



const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    users: [{
        username: String,
        socketId: String
    }],
    messages: [{
        username: String,
        text: String,
        timestamp: {type: Date, default: Date.now},

    }],
})

module.exports = mongoose.model('Room', roomSchema)