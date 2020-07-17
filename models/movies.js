const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = require('./genres');

const Movies = mongoose.model('Customer', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    genre: {
        type: genreSchema,
        required: true
    }
}));

//function for validating the customer name
function validateMovies(Movies) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };

    return Joi.validate(customer, schema);
}

exports.Movies = Movies;
exports.validateMovies = validateMovies;