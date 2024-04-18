const { findAllChambers, addChamber, updateChamber, removeChamber } = require('../controllers/chamberController')
const authenticated = require('../middlewares/authenticated')

const router = require('express').Router()

router
    .get('/:id', authenticated, findAllChambers)
    .post('/:id', authenticated, addChamber)
    .put('/:id', authenticated, updateChamber)
    .delete('/:id', authenticated, removeChamber)


module.exports = router