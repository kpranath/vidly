const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genres');
const { Movies, validateMovies } = require('../models/movies');


//getting all the movies
router.get('/', async (req, res) => {
    const movies = await Movies.find().sort('title');
    res.send(movies);
});

//creating a new movie
router.post('/', async (req, res) => {

    const { error } = validateMovies(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res, status(400).send('Invalid genre...');

    let movies = new Movies({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dilyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });
    movies = await movies.save();
    res.send(movies);
});

//deleting the given Movies
router.delete('/:id', async (req, res) => {
    const movies = await Movies.findByIdAndRemove(req.params.id);

    if (!movies) return res.status(404).send('The requestd id for Movies doesnot exists');

    res.send(movies);
});

//Getting a specific Movies by id
router.get('/:id', async (req, res) => {
    const movies = await Movies.findById(req.params.id);

    if (!movies) return res.status(404).send('The requested id for Movies doesnot exists');

    res.send(movies);
});

module.exports = router;