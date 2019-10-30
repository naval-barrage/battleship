const mongoose = require('mongoose')
    const Board = require('./Board').schema

const GameSchema = new mongoose.Schema({
    gameroom_id: {type: 'number'},
    host: [Board],
    guest: [Board]
})

module.exports = mongoose.model("Game", GameSchema)