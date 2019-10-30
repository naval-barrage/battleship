const mongoose = require('mongoose')
    const Board = require('./Board').schema

const GameSchema = new mongoose.Schema({
    gameroom_id: {type: 'number'},
    hostBoard: {type: 'array'},
    guestBoard: {type: 'array'}
})

module.exports = mongoose.model("Game", GameSchema)