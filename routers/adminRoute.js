const { getAlldoctors, getAllusers, getAllhospitals } = require('../controllers/adminController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()


router.get('/getAlldoctors',authenticated,getAlldoctors)
      .get('/getAllusers',authenticated,getAllusers)
      .get('/getAllhospitals',authenticated,getAllhospitals)
      

module.exports = router