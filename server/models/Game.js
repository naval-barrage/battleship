const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    gameroom_id: {type: 'number'},
    host: {type: 'array'},
    guest: {type: 'array'}
})

module.exports = mongoose.model("Game", GameSchema)