const { applyDoctor,cancelDoctor, approvedDoctor, findDoctor, removeChamber, addChamber, find, updateChamber, allApprovedDoctors, updateDoctor, allApprovedDoctorsSpecialization, allApprovedSpecialistDoctors, deleteDoctor} = require('../controllers/doctorController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()

router.get('/allApprovedDoctors',allApprovedDoctors)
      .get('/specialist',allApprovedDoctorsSpecialization)
      .get('/find/specialist',allApprovedSpecialistDoctors)
      .post('/apply',authenticated,applyDoctor)
      .post('/approve/:id',authenticated,approvedDoctor)
      .post('/cancel/:id',authenticated,cancelDoctor)
      .post('/delete/:id',authenticated,deleteDoctor)
      .get('/:id',authenticated,find)
      .put('/update/:id',authenticated,updateDoctor)
      .get('/find/:id',authenticated,findDoctor)
      .post('/addChamber/:doctorId',authenticated,addChamber)
      .put('/updateChamber/:doctorId',authenticated,updateChamber)
      .put('/deleteChamber/',authenticated,removeChamber)


module.exports = router