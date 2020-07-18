const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customer');
const movies = require('./routes/movies');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to mongodb...'))
    .catch(err => console.error('Couldnot connect to mongodb...'));

app.use(express.json());
app.use('/api/genre', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));