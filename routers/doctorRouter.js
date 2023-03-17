const { applyDoctor,cancelDoctor, approvedDoctor, findDoctor, removeChamber, addChamber, find, findAllChambers, findChamber, updateChamber, allApprovedDoctors, updateDoctor} = require('../controllers/doctorController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()

router.get('/allApprovedDoctors',allApprovedDoctors)
      .post('/apply',authenticated,applyDoctor)
      .post('/approve/:id',authenticated,approvedDoctor)
      .post('/cancel/:id',authenticated,cancelDoctor)
      .get('/:id',authenticated,find)
      .put('/update/:id',authenticated,updateDoctor)
      .put('/delete/:id',authenticated,find)
      .get('/find/:id',authenticated,findDoctor)
      .post('/addChamber/:doctorId',authenticated,addChamber)
      .get('/findChambers/:doctorId',findAllChambers)
      .get('/findChamber/:chamberId',authenticated,findChamber)
      .put('/updateChamber/:chamberId',authenticated,updateChamber)
      .delete('/deleteChamber/:chamberId',authenticated,removeChamber)


module.exports = router