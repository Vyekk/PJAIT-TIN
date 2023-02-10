var express = require('express');
var router = express.Router();
const rentalController = require('../controllers/rentalController');

router.get('/',rentalController.showRentalList);
router.get('/add',rentalController.showRentalAddForm);
router.get('/edit/:idRental',rentalController.showRentalEditForm);
router.get('/details/:idRental',rentalController.showRentalDetailsForm);

router.post('/add',rentalController.addRental);
router.post('/edit', rentalController.updateRental);
router.get('/delete/:idRental', rentalController.deleteRental);
module.exports = router;