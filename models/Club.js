const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClubSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Card'
    }
  ],
  teamCards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TeamCard'
    }
  ],
  creation: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Club', ClubSchema)
