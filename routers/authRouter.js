const { signup, signin, getProfile, seenNotification, seenAllNotification, deleteAllNotification, findUser, updateProfile, uploadProfilePhoto, verifyAccount, find } = require('../controllers/authController')
const authenticated = require('../middlewares/authenticated')
const { uploadUser } = require('../middlewares/upload')

const router = require('express').Router()

router.post('/signup',signup)
      .post('/signin',signin)

router.post('/verify',authenticated,verifyAccount)
      .post('/signin',signin)

router.get('/user/:id',authenticated,getProfile)
      .get('/finduser/:id',findUser)
      .get('/find/',find)
      .put('/user/update/:id',updateProfile)
      .post('/upload/:id',authenticated,uploadUser.single('file'),uploadProfilePhoto)

router.post('/user/seenNotification',authenticated,seenNotification)
      .post('/user/seenAllNotification',authenticated,seenAllNotification)
      .post('/user/deleteAllNotification',authenticated,deleteAllNotification)

module.exports = router