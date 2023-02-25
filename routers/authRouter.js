const { signup, signin, getProfile, seenNotification, seenAllNotification, deleteAllNotification, findUser } = require('../controllers/authController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()

router.post('/signup',signup)
      .post('/signin',signin)

router.get('/user/:id',authenticated,getProfile)
      .get('/finduser/:id',findUser)

router.post('/user/seenNotification',authenticated,seenNotification)
      .post('/user/seenAllNotification',authenticated,seenAllNotification)
      .post('/user/deleteAllNotification',authenticated,deleteAllNotification)

module.exports = router