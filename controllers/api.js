const Cards_conainter = require('../models/cards_container')
const club = require('../models/Club')
const Teamcard = require('../models/TeamCard')

const get_all_clubs = async () => {
  return club.find().select('name')
}
const get_club = async (id) => {
  return club.findById(id)
}
const get_cards_conainters = async (ids) => {
  let all_cards_conainters = []
  for (let i = 0; i < ids.length; i++) {
    let cards_conatiner = await Cards_conainter.findById(ids[i]).populate('cards')
    all_cards_conainters.push(cards_conatiner)
  }
  return all_cards_conainters
}
const get_teamcards = async (ids) => {
  let all_teamcards = []
  for (let i = 0; i < ids.length; i++) {
    let teamcard = await Teamcard.findById(ids[i])
    all_teamcards.push(teamcard)
  }
  return all_teamcards
} 
module.exports = {
  get_all_clubs,
  get_club,
  get_cards_conainters,
  get_teamcards
}
