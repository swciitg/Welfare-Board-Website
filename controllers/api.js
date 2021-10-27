const club = require('../models/Club')

const get_all_clubs = async () => {
  return club.find()
}

const get_club_details = async (id) => {
  return club.findById(id).populate(['cards', 'teamCards'])
}

module.exports = { get_all_clubs, get_club_details }
