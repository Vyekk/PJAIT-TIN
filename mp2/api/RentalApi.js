const rentalsRepository = require('../repository/mysql2/rentalsRepository');

exports.getRentals = (req,res,next) => {
    rentalsRepository.getRentals()
    .then(rentals => {
        res.status(200).json(rentals);
    })
    .catch(err => {
        console.log(err);
    });
}
exports.getRentalById = (req,res,next) => {
    const idRental = req.params.idRental;
    rentalsRepository.getRentalById(idRental)
    .then(rental => {
        if(!rental) {
            res.status(404).json({
                message: 'Wypozyczenie z id: ' + idRental + 'nie istnieje'
            })
        } else {
            res.status(200).json(rental);
        }
    });
}
exports.createRental = (req,res,next) => {
   rentalsRepository.createRental(req.body)
   .then(newObj => {
        res.status(201).json(newObj);
   })
   .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
   });
};
exports.updateRental = (req,res,next) => {
    const idRental = req.params.idRental;
    rentalsRepository.updateRental(idRental, req.body)
    .then(result => {
        res.status(200).json({message: 'Wypozyczenie zaktualizowane!', rental: result});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.deleteRental = (req,res,next) => {
    const idRental = req.params.idRental;
    rentalsRepository.deleteRental(idRental)
    .then(result => {
        res.status(200).json({message: 'Wypozyczenie usuniete!', rental: result});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};