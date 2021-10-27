const mongoose = require('mongoose')

const CardSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creation: {
    type: Date,
    default: Date.now
  },
  Event: {
    type: Boolean,
  }
})

module.exports = mongoose.model('Card', CardSchema)