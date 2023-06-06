const { initPayment } = require('../controllers/TransectionControllers')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()


router.post('/init',authenticated,initPayment)     

module.exports = router