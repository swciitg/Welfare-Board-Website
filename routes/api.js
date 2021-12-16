const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api')

// router.use(()=>{
//   if()
// })
router.route('/clubs').get(async (req, res) => {
  let club_names = await apiController.get_all_clubs()
  res.json(club_names)
})

router.route('/club/:club').get(async (req, res) => {
  let clubs = await apiController.get_club(req.params.club)
  res.json(clubs)
})
router.route('/team/:id').get(async (req, res) => {
  let teamcard = await apiController.get_teamcards(req.params.id)
  res.json(teamcard)
})

router.route('/cards_container').get(async (req, res) => {
  console.log('API', req.query)
  let cards_container = await apiController.get_cards_containers(req.query.cards_container)
  res.json(cards_container)
})
router.route('/teamcard').get(async (req, res) => {
  let teamcard = await apiController.get_teamcards(req.query.teamcard)
  res.json(teamcard)
})
router.route('/club').post(async (req, res) => {
  console.log(req.body)
  let club=await apiController.create_club(
    req.body.clubContainer,
    req.body.name,
    req.body.about,
    req.body.date
  )
  return res.json(club)
})
router.route('/club').put(async (req, res) => {
  // await apiController.delete_club(req.body.id)
  // let club=await apiController.create_club(
    // req.body.clubContainer,
    // req.body.name,
    // req.body.about,
    // req.body.date
  // )
 
  let club = await apiController.update_club(
    req.body.id,
    req.body.clubContainer,
    req.body.name,
    req.body.about,
    req.body.date
  )
 return res.json(club)
})
router.route('/club').delete(async (req, res) => {
  await apiController.delete_club(req.body.id)
  res.send('Delete Called')
})
router.get('/get_all_slides',async (req, res) => {
  let data = await apiController.get_all_slides();
  console.log(data)
  res.json(data);
})
module.exports = router
