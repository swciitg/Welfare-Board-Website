const mongoose = require('mongoose')

const TeamCardSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: {type:String}
})

module.exports = mongoose.model('TeamCard', TeamCardSchema)
    