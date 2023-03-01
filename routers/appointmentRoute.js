const { addAppointment, searchAppointment } = require('../controllers/appointmentController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()


router.get('/all/search',authenticated,searchAppointment)
      .post('/add',authenticated,addAppointment)
      
    //   .get('/getAllhospitals',authenticated,getAllhospitals)
      

module.exports = router