const { signup, signin, getProfile, seenNotification, seenAllNotification, deleteAllNotification, findUser, updateProfile, uploadProfilePhoto, verifyAccount, find, forgetPassword, resetPassword, sentCodeAgain, addField, getNotifications } = require('../controllers/authController')
const authenticated = require('../middlewares/authenticated')
const { uploadUser } = require('../middlewares/upload')

const router = require('express').Router()

router.post('/signup',signup)
      .post('/signin',signin)

router.post('/verify',authenticated,verifyAccount)
      .post('/forget-password',forgetPassword)
      .post('/reset-password',authenticated,resetPassword)
      .post('/sent-code-again',authenticated,sentCodeAgain)

router.get('/user/:id',authenticated,getProfile)
      .get('/finduser/:id',findUser)
      .get('/find/',find)
      .put('/user/update/:id',updateProfile)
      .post('/upload/:id',authenticated,uploadUser.single('file'),uploadProfilePhoto)

router.get('/notifications',authenticated, getNotifications)
      .post('/seen-notification/:id',authenticated,seenNotification)
      .post('/seen-all-notification',authenticated,seenAllNotification)
      .post('/delete-all-notification',authenticated,deleteAllNotification)

router.post('/add-field',addField)

module.exports = router