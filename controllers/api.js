const Cards_conainter = require('../models/cards_container')
const club = require('../models/Club')
const Teamcard = require('../models/TeamCard')

const get_all_clubs = async () => {
  return club.find().select('name')
}
const get_club = async (id) => {
  return club.findById(id).populate('about')
}
const get_cards_containers = async (id) => {
  let cards_container = await Cards_conainter.findById(id).populate('cards')
  return cards_container
}
const get_teamcards = async (id) => {
  let teamcard = await club.findById(id).populate('team_cards').select('team_cards')
  return teamcard
}
const get_events = async (id) => {
  let events = await club.findById(id).populate('events').select('events')
  return events
}
module.exports = {
  get_all_clubs,
  get_club,
  get_cards_containers,
  get_teamcards,
  get_events
}
