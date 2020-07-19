const { Rentals, validateRental } = require('../models/rental');
const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const { Customer } = require('../models/customer');
const { Movies } = require('../models/movies');
const router = express.Router();

Fawn.init(mongoose);

//getting all the rentals
router.get('/', async (req, res) => {
    const rentals = await Rentals.find().sort('-dateOut ');
    res.send(rentals);
});

//creating a new rental
router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res, status(400).send('Invalid customer...');

    const movie = await Movies.findById(req.body.movieId);
    if (!movie) return res, status(400).send('Invalid movie...');

    if (movie.numberInStock === 0) return res.status(400).send('Movie outofStock');

    let rental = new Rentals({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movies: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });


    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        res.send(rental);
    }
    catch (ex) {
        res.status(500).send('Something failed...');
        console.log(ex);
    }
});


module.exports = router;