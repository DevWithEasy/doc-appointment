const { applyDoctor,cancelDoctor, approvedDoctor, findDoctor, findAllActiveDoctor, removeChamber, addChamber, find} = require('../controllers/doctorController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()

router.post('/apply',authenticated,applyDoctor)
      .post('/approve/:id',authenticated,approvedDoctor)
      .post('/cancel/:id',authenticated,cancelDoctor)
      .get('/:id',authenticated,find)
      .get('/find/:id',authenticated,findDoctor)
      .get('/allActiveDoctor',findAllActiveDoctor)
      .post('/addChamber/:id',authenticated,addChamber)
      .post('/deleteChamber/:id',authenticated,removeChamber)


module.exports = router