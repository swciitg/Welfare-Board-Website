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
router.route('/cards_container/:containers').get(async (req, res) => {
  const containers = req.params.containers.split(',');
  let cards_container = await apiController.get_cards_conainters(containers);
  res.json(cards_container)
})
router.route('/teamcard/:ids').get(async (req, res) => {
  const teamcards = req.params.ids.split(',');
  let teamcard = await apiController.get_teamcards(teamcards);
  res.json(teamcard)
})

module.exports = router
