const Cards_conainter = require('../models/cards_container')
const club = require('../models/Club')
const Teamcard = require('../models/TeamCard')

const get_all_clubs = async () => {
  return club.find().select('name')
}
const get_club = async (id) => {
  return club.findById(id)
}
const get_cards_containers = async (id) => {
  let cards_container = await Cards_conainter.findById(id).populate('cards')
  return cards_container;
}
const get_teamcards = async (id) => {
  let teamcard = await Teamcard.findById(id)
  return teamcard
}
module.exports = {
  get_all_clubs,
  get_club,
  get_cards_containers,
  get_teamcards
}
