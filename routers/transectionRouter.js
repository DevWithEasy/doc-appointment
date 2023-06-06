const { initPayment, successPayment, failurePayment } = require('../controllers/TransectionControllers')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()


router.post('/init',authenticated,initPayment)
.post('/success/:tnxID',successPayment)
.post('/failure/:tnxID',failurePayment)

module.exports = router