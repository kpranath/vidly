const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = require('./genres');

const Movies = mongoose.model('Movie', new mongoose.Schema({
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

//function for validating the movie object
function validateMovies(Movies) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        genreId: Joi.objectId().required()
    };

    return Joi.validate(Movies, schema);
}

exports.Movies = Movies;
exports.validateMovies = validateMovies;