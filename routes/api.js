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
router.route('/cards_container').get(async (req, res) => {
  
  let cards_container = await apiController.get_cards_conainters(req.query.cards_container)
  res.json(cards_container)
})
router.route('/teamcard').get(async (req, res) => {
  let teamcard = await apiController.get_teamcards(req.query.teamcard)
  res.json(teamcard)
})
router.route('/club').post(async (req, res) => {
console.log(req.body)
  await apiController.create_club(req.body.clubContainer, req.body.name, req.body.about, req.body.date);
})
router.route('/club').put(async (req, res) => {
  apiController.delete_club(req.body.id)
  console.log(req.body)
  await apiController.create_club(req.body.clubContainer, req.body.name, req.body.about, req.body.date)
 
})
router.route('/club/:club').delete(async (req, res) => {
 await apiController.delete_club(req.params.club)
})

module.exports = router
