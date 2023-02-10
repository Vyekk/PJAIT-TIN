const rentalsRepository = require('../repository/mysql2/rentalsRepository');

exports.showRentalList = (req,res,next) => {
    rentalsRepository.getRentals()
    .then(rentals => {
        res.render('pages/rental-view/rental-list',{
            rentals: rentals,
            navLocation: 'main'
        });
    });
    // res.render('pages/rental-view/rental-list', {navLocation: 'main'});
};
exports.showRentalAddForm = (req,res,next) => {
    res.render('pages/rental-view/rental-form', {
        rental: {},
        pageTitle: 'Nowe wypożyczenie',
        formMode: 'createNew',
        btnLabel: 'Dodaj wypozyczenie',
        formAction: '/rentals/add',
        navLocation: 'main'
    });
};
exports.showRentalEditForm = (req,res,next) => {
    const idRental = req.params.idRental;
    rentalsRepository.getRentalById(idRental)
    .then(rental => {
        res.render('pages/rental-view/rental-form', {
            rental: rental,
            pageTitle: 'Edycja wypożyczenia',
            formMode: 'edit',
            btnLabel: 'Edytuj wypozyczenie',
            formAction: '/rentals/edit',
            navLocation: 'main'
        });
    });
};
exports.showRentalDetailsForm = (req,res,next) => {
    const idRental = req.params.idRental;
    rentalsRepository.getRentalById(idRental)
    .then(rental => {
        res.render('pages/rental-view/rental-form', {
            rental: rental,
            pageTitle: 'Szczegóły wypożyczenia',
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'main'
        });
    });
};

exports.addRental = (req, res, ext) => {
    const rentalData = { ...req.body}
    rentalsRepository.createRental(rentalData)
    .then(result => {
        res.redirect('/rentals');
    })
    .catch(err => {
        res.render('pages/rental-view/rental-form', {
            rental: rentalData,
            pageTitle: "Nowe wypożyczenie",
            formMode: 'createNew',
            btnLabel: 'Dodaj wypożyczenie',
            formAction: '/rentals/add',
            navLocation: 'main',
            validationErrors: err.details
        });
    });
};
exports.updateRental = (req, res, ext) => {
    const idRental = req.body.IdWypozyczenie;
    const rentalData = { ...req.body}
    rentalsRepository.updateRental(idRental, rentalData)
    .then(result => {
        res.redirect('/rentals');
    })
    .catch(err => {
        rentalData.Data_wypozyczenia = new Date(rentalData.Data_wypozyczenia) -1;
        rentalData.Data_zwrotu = new Date(rentalData.Data_zwrotu) -1;
        res.render('pages/rental-view/rental-form', {
            rental: rentalData,
            pageTitle: "Edycja wypożyczenia",
            formMode: 'edit',
            btnLabel: 'Edytuj wypożyczenie',
            formAction: '/rentals/edit/',
            navLocation: 'main',
            validationErrors: err.details
        });
    });
};
exports.deleteRental = (req, res, ext) => {
    const idRental = req.params.idRental;
    rentalsRepository.deleteRental(idRental)
    .then(() => {
        res.redirect('/rentals');
    });
};