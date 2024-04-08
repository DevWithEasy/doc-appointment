const { applyDoctor, cancelDoctor, approvedDoctor, findDoctor, removeChamber, addChamber, find, updateChamber, updateDoctor, findDoctorBySpecialist,findDoctorByPagination, deleteDoctor, getHomeData, findDoctorByDayAndSpecialist } = require('../controllers/doctorController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()

router.post('/apply', authenticated, applyDoctor)
      .get('/home-data', getHomeData)
      .get('/find', findDoctorByDayAndSpecialist)
      .get('/search/:id', findDoctorBySpecialist)
      .get('/page/:no', findDoctorByPagination)
      .post('/approve/:id', authenticated, approvedDoctor)
      .post('/cancel/:id', authenticated, cancelDoctor)
      .post('/delete/:id', authenticated, deleteDoctor)
      .get('/:id', authenticated, find)
      .put('/update/:id', authenticated, updateDoctor)
      .get('/find/:id', findDoctor)
      .post('/addChamber/:doctorId', authenticated, addChamber)
      .put('/updateChamber/:doctorId', authenticated, updateChamber)
      .put('/deleteChamber/', authenticated, removeChamber)


module.exports = router