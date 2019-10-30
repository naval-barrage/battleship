const mongoose = require('mongoose')

const BoardSchema = new mongoose.Schema({
    grid: {type: 'array'}
})

module.exports = mongoose.model("Board", BoardSchema)