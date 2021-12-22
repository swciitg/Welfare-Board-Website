const express = require('express')

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  if(!req.session.user_present)res.redirect('login');
  res.render('home')
})

module.exports = router
