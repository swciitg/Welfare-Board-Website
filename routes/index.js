const express = require('express')

const router = express.Router()
const userRouter = require('./users')
const apiRouter = require('./api')
const adminRouter = require('./admin')

const indexController = require('../controllers/index')

/* GET CONTROLLER */

router.get('/', indexController.indexView)
router.use('/adminside', adminRouter)

//= ==================================== DECLARE ALL YOUR ROUTERS HERE ==================================

router.use('/api', apiRouter)
router.use('/users', userRouter)

module.exports = router
