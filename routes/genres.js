const { Genre, validateGenre } = require('../models/genres');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//getting all the genres
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

//creating a new genre
router.post('/', async (req, res) => {

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});

//updating a given genre
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    if (!genre) return res.status(404).send('The requested id for genre doesnot exists');

    res.send(genre);
});

//deleting the given genre
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The requestd id for genre doesnot exists');

    res.send(genre);
});

//Getting a specific genre by id
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The requested id for genre doesnot exists');

    res.send(genre);
});

module.exports = router;
