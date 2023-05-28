const { AddBalance } = require('../controllers/TransectionControllers')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()


router.post('/add',authenticated,AddBalance)
      

module.exports = router