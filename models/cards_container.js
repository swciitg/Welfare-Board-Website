const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Card_containerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Card'
    }
  ],
  event: {
    type: Boolean,
  },

})

module.exports = mongoose.model('Cards_container', Card_containerSchema)
