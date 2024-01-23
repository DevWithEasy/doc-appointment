const { addHospital, getHospital, getAllHospital, updateHospital, deleteHospital, getHospitalDoctors } = require('../controllers/vanueController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()


router.post('/add',authenticated,addHospital)
      .get('/all',getAllHospital)
      .get('/:id',authenticated,getHospital)
      .put('/update/:id',authenticated,updateHospital)
      .delete('/delete/:id',authenticated,deleteHospital)
      .get('/doctors/:id',getHospitalDoctors)
      

module.exports = router