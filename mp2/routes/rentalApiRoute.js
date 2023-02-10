const express = require('express');
const router = express.Router();

const rentalApiController = require('../api/RentalApi');

router.get('/', rentalApiController.getRentals);
router.get('/:idRental', rentalApiController.getRentalById);
router.post('/', rentalApiController.createRental);
router.put('/:idRental', rentalApiController.updateRental);
router.delete('/:idRental', rentalApiController.deleteRental);

module.exports = router;