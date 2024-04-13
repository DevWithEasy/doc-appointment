const { findAllChambers, addChamber, updateChamber, removeChamber } = require('../controllers/chamberController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()

router
    .get('/:id', authenticated, findAllChambers)
    .post('/add_chamber/:id', authenticated, addChamber)
    .put('/update_chamber/:id', authenticated, updateChamber)
    .delete('/delete_chamber/:id', authenticated, removeChamber)


module.exports = router