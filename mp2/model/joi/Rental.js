const Joi = require('joi');

// const errMessages = (errors) => {
//     errors.array.forEach(err => {
//         switch (err.code) {
//             case "string.empty":
//                 err.message = "Pole jest wymagane";
//                 break;
//             case ""
//         }
//     });
// }

const rentalSchema = Joi.object({
    IdWypozyczenie: Joi.optional(),
    IdInstrument: Joi.number().required(),
    IdKlient: Joi.number().required(),
    Data_wypozyczenia: Joi.date().required(),
    Data_zwrotu: Joi.date().required()
});

module.exports = rentalSchema;