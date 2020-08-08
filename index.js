require('express-async-errors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const winston = require('winston');
require('winston-mongodb');
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const app = express();
const error = require('./middleware/error');
const genres = require('./routes/genres');
const customers = require('./routes/customer');
const movies = require('./routes/movies');
const rentals = require('./routes/rental');
const users = require('./routes/users');
const auth = require('./routes/auth');

winston.handleExceptions(
    new winston.transports.File({ filename: 'logfile.log' })
);

process.on('uncaughtException', (ex) => {
    console.log('We got an exception');
    winston.error(ex.message, ex);
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });

// enable this code when envi vae is set
// if (!config.get('jwtPrivateKey')) {
//     console.error('Fatal Error: jwtPrivateKey is not defined..');
//     process.exit(1);
// }

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to mongodb...'))
    .catch(err => console.error('Couldnot connect to mongodb...'));

app.use(express.json());
app.use('/api/genre', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));