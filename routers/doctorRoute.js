const { applyDoctor,cancelDoctor, approvedDoctor, findDoctor, findAllActiveDoctor, removeChamber, addChamber, find, findAllChambers, findChamber, updateChamber} = require('../controllers/doctorController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()

router.post('/apply',authenticated,applyDoctor)
      .post('/approve/:id',authenticated,approvedDoctor)
      .post('/cancel/:id',authenticated,cancelDoctor)
      .get('/:id',authenticated,find)
      .get('/find/:id',authenticated,findDoctor)
      .get('/allActiveDoctor',findAllActiveDoctor)
      .post('/addChamber/:doctorId',authenticated,addChamber)
      .get('/findChambers/:doctorId',authenticated,findAllChambers)
      .get('/findChamber/:chamberId',authenticated,findChamber)
      .put('/updateChamber/:chamberId',authenticated,updateChamber)
      .delete('/deleteChamber/:chamberId',authenticated,removeChamber)


module.exports = router