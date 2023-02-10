const db = require('../../config/mysql2/db');
const rentalSchema = require('../../model/joi/Rental');

exports.getRentals = () => {
    return db.promise().query('SELECT * FROM Wypozyczenie')
    .then((results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    }); 
}
exports.getRentalById = (IdWypozyczenie) => {
    const query = 'SELECT r.IdInstrument, r.IdKlient, r.Data_wypozyczenia, r.Data_zwrotu, r.Koszt_przegladu, i.Nazwa, i.Cena_za_dzien, k.Imie, k.Nazwisko FROM Wypozyczenie r LEFT JOIN Klient k on r.IdKlient=k.IdKlient LEFT JOIN Instrument i on r.IdInstrument = i.IdInstrument WHERE r.IdWypozyczenie = ?;'
    return db.promise().query(query, [IdWypozyczenie])
    .then((results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const rental = {
            IdWypozyczenie: parseInt(IdWypozyczenie),
            IdInstrument: firstRow.IdInstrument,
            IdKlient: firstRow.IdKlient,
            Data_wypozyczenia: firstRow.Data_wypozyczenia,
            Data_zwrotu: firstRow.Data_zwrotu,
            Koszt_przegladu: firstRow.Koszt_przegladu,
            Klient: {
                Imie: firstRow.Imie,
                Nazwisko: firstRow.Nazwisko
            },
            Instrument: {
                Nazwa: firstRow.Nazwa,
                Cena_za_dzien: firstRow.Cena_za_dzien
            }
        }
        return rental;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}
exports.createRental = (newRentalData) => {
    const vRes = rentalSchema.validate(newRentalData, {abortEarly: false});
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const idInstrument = newRentalData.IdInstrument;
    const idClient = newRentalData.IdKlient;
    const rentalDate = newRentalData.Data_wypozyczenia;
    const returnDate = newRentalData.Data_zwrotu;
    const sql = 'INSERT INTO Wypozyczenie VALUES (null, ?, ?, ?, ?, 0)';
    return db.promise().execute(sql, [idInstrument,idClient,rentalDate,returnDate]);
}
exports.updateRental = (IdWypozyczenie,newRentalData) => {
    const vRes = rentalSchema.validate(newRentalData, {abortEarly: false});
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const idInstrument = newRentalData.IdInstrument;
    const idClient = newRentalData.IdKlient;
    const rentalDate = newRentalData.Data_wypozyczenia;
    const returnDate = newRentalData.Data_zwrotu;
    const sql = 'UPDATE Wypozyczenie set IdInstrument = ?, IdKlient = ?, Data_wypozyczenia = ?, Data_zwrotu = ? WHERE IdWypozyczenie = ?';
    return db.promise().execute(sql, [idInstrument,idClient,rentalDate,returnDate,IdWypozyczenie]);
}
exports.deleteRental = (IdWypozyczenie) => {
    const sql = 'DELETE FROM Wypozyczenie where IdWypozyczenie = ?';
    return db.promise().execute(sql, [IdWypozyczenie]);
}