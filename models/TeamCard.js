const mongoose = require('mongoose')

const TeamCardSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String},
  phone: { type: String },
  role: {type: String},
  image: {type:String}
})

module.exports = mongoose.model('TeamCard', TeamCardSchema)
    