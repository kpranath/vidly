const Joi = require('joi');
const express = require('express');
const router = express.Router();

genres = [
    { id: 1, name: "Romantic" },
    { id: 2, name: "Comedy" },
    { id: 3, name: "Action" },
    { id: 4, name: "Horror" },
];

//getting all the genres
app.get('/', (req, res) => {
    res.send(genres);
});

//creating a new genre
router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

//updating a given genre
router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requested id for genre doesnot exists');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

//deleting the given genre
router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requestd id for genre doesnot exists');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

//Getting a specific genre by id
router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requested id for genre doesnot exists');
    res.send(genre);
});

//function for validating the genre name
function validateGenre(genre) {
    const schema = {
        name: Joi.string().required().min(3)
    };

    return Joi.validate(genre, schema);
}
module.exports = router;
