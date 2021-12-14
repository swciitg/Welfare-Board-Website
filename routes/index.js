const express = require('express')

const router = express.Router()
const userRouter = require('./users')
const apiRouter = require('./api')
const adminRouter = require('./admin')
const loginRouter = require('./login')

const indexController = require('../controllers/index')

/* GET CONTROLLER */

router.get('/', indexController.indexView)
router.use('/login', loginRouter)
router.use('/adminside', adminRouter)
router.use('/api', apiRouter)
router.use('/users', userRouter)
router.post('/logout',(req,res)=>{
    req.session.user_present=false;
    res.json('Successfull!');
})
module.exports = router
