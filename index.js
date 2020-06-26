const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

genres = [
    { id: 1, name: "Romantic" },
    { id: 2, name: "Comedy" },
    { id: 3, name: "Action" },
    { id: 4, name: "Horror" },
];

//getting all the genres
app.get('/api/genre', (req, res) => {
    res.send(genres);
});

//creating a new genre
app.post('/api/genre', (req, res) => {
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
app.put('/api/genre/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requested id for genre doesnot exists');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

//deleting the given genre
app.delete('/api/genre/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requestd id for genre doesnot exists');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

//Getting a specific genre by id
app.get('/api/genre/:id', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));