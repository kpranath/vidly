const express = require('express');
const error = require('../middleware/error');
const genres = require('../routes/genres');
const customers = require('../routes/customer');
const movies = require('../routes/movies');
const rentals = require('../routes/rental');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genre', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}