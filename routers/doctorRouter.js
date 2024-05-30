const { applyDoctor, cancelDoctor, approvedDoctor, findDoctor, find, updateDoctor, findDoctorBySpecialist,findDoctorByPagination, deleteDoctor, getHomeData, findDoctorByDayAndSpecialist, findForAppointmentSubmit, findDoctorProfile } = require('../controllers/doctorController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()

router.post('/apply', authenticated, applyDoctor)
      .get('/home-data', getHomeData)
      .get('/find', findDoctorByDayAndSpecialist)
      .get('/:id', find)
      .get('/search/:id', findDoctorBySpecialist)
      .get('/page/:no', findDoctorByPagination)
      .post('/approve/:id', authenticated, approvedDoctor)
      .post('/cancel/:id', authenticated, cancelDoctor)
      .post('/delete/:id', authenticated, deleteDoctor)
      .put('/update/:id', authenticated, updateDoctor)
      .get('/find/:id',findDoctor)
      .get('/find/appointment/:id',findForAppointmentSubmit)
      .get('/find/profile/:id',authenticated,findDoctorProfile)
      
module.exports = router