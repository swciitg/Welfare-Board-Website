const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClubSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  about: [
    {
      type: String,
      default: '',
    }
  ],
  cards_containers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cards_container'
    }
  ],
  events_containers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cards_container'
    }
  ],
  team_cards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TeamCard'
    }
  ],
  creation: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Club', ClubSchema)
