const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api')

router.route('/clubs').get(async (req, res) => {
  let club_names = await apiController.get_all_clubs()
  res.json(club_names)
})
router.route('/club/:club').get(async (req, res) => {
  let clubs = await apiController.get_club(req.params.club)
  res.json(clubs)
})
router.route('/cards_container/:cards_container').get(async (req, res) => {
  let cards_container = await apiController.get_cards_containers(req.params.cards_container)
  res.json(cards_container)
})
router.route('/teamcard').get(async (req, res) => {
  let teamcard = await apiController.get_teamcards(req.body.teamcard)
  res.json(teamcard)
})

module.exports = router
