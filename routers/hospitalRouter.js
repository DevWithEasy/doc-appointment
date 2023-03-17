const { addHospital, getHospital, getAllHospital, updateHospital, deleteHospital } = require('../controllers/hospitalController')
const authenticated = require('../middlewares/authenticated')
const { uploadHospital } = require('../middlewares/upload')

const router = require('express').Router()


router.post('/add',authenticated,uploadHospital.single('file'),addHospital)
      .get('/all',authenticated,getAllHospital)
      .get('/:id',authenticated,getHospital)
      .put('/update/:id',authenticated,uploadHospital.single('file'),updateHospital)
      .delete('/delete/:id',authenticated,deleteHospital)
      

module.exports = router