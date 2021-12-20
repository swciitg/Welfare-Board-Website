const express = require('express')
const router = express.Router()
require('dotenv').config()
router
  .route('/')
  .get((req, res) => {
    res.render('login')
  })
  .post((req, res) => {
    if (process.env.LOGIN_PASSWORD && req.body.data.password == process.env.LOGIN_PASSWORD) {
      req.session.user_present = true
      res.json('True')
    } else {
      res.json('False')
    }
  })
module.exports = router
