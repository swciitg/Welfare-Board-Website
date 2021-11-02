const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AboutSchema = mongoose.Schema({
  title: {
    type: 'string',
    required: true
  },
  description: {
    type: 'string',
    required: true
  }
})
module.exports = mongoose.model('About', AboutSchema)
