const mongoose = require('mongoose')

const TeamCardSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
})

module.exports = mongoose.model('TeamCard', TeamCardSchema)
