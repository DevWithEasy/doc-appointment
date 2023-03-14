const {  } = require('../controllers/adminController')
const { addHospital, updateHospital, deleteHospital, getAllHospital } = require('../controllers/hospitalController')
const authenticated = require('../middlewares/authenticated')
const { uploadHospital } = require('../middlewares/upload')

const router = require('express').Router()


router.post('/add',authenticated,uploadHospital.single('file'),addHospital)
      .get('/all',authenticated,getAllHospital)
      .put('/update/:id',authenticated,updateHospital)
      .delete('/delete/:id',authenticated,deleteHospital)
      

module.exports = router