const { createSpecialist,updateSpecialist,deleteSpecialist,getAllSpecialist} = require('../controllers/specialistController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()


router.post('/',authenticated,createSpecialist)
    .put('/:id',authenticated,updateSpecialist)
    .delete('/:id',authenticated,deleteSpecialist)
    .get('/',getAllSpecialist)

module.exports = router