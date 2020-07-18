const { Rental, validateRental } = require('../models/rental');
const mongoose = require('mongoose');
const express = require('express');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');
const router = express.Router();

//getting all the rentals
router.get('/', async (req, res) => {
    const rentals = await Renatl.find().sort('-dateOut ');
    res.send(rentals);
});

//creating a new rental
router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res, status(400).send('Invalid customer...');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res, status(400).send('Invalid movie...');

    if (movie.numberInStock === 0) return res.status(400).send('Movie outofStock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movies: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.DailyRentalRate
        }
    });

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
});


module.exports = router;