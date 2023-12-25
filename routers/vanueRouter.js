const { addHospital, getHospital, getAllHospital, updateHospital, deleteHospital } = require('../controllers/vanueController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()


router.post('/add',authenticated,addHospital)
      .get('/all',authenticated,getAllHospital)
      .get('/:id',authenticated,getHospital)
      .put('/update/:id',authenticated,updateHospital)
      .delete('/delete/:id',authenticated,deleteHospital)
      

module.exports = router