const { addAppointment, searchAppointment, confirmAppointment, rejectAppointment, getAllAppointment, getAppointmentDetails } = require('../controllers/appointmentController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()


router.get('/all/search',authenticated,searchAppointment)
      .get('/all/:id',authenticated,getAllAppointment)
      .get('/details/:id',authenticated,getAppointmentDetails)
      .post('/add',authenticated,addAppointment)
      .put('/confirm/:id',authenticated,confirmAppointment)
      .put('/reject/:id',authenticated,rejectAppointment)
      .delete('/delete/:id',authenticated,addAppointment)
      
    //   .get('/getAllhospitals',authenticated,getAllhospitals)
      

module.exports = router