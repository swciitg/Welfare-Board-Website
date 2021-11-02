const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = mongoose.Schema({
  title: {
    type: 'string',
    required: true
  },
  description: {
    type: 'string',
    required: true
  },
  image: {
    type: 'string'
  },
  type: {
    type: 'string',
    enum: ['CULTURAL','TECHNICAL'],
    required: true
  },
  creation: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Event', EventSchema)
