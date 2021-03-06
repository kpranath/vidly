const _ = require('lodash');
const config = require('config');
const Joi = require('joi');
const { User } = require('../models/users');
const asyncMiddleware = require('../middleware/async');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const sha256 = require('sha256');

// creating a new user
router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password...');

    if (sha256(req.body.password) !== user.password) return res.status(400).send('Invalid email or password...');

    const accessToken = user.generateAuthToken();

    res.send(accessToken);

}));

function validate(req) {
    const Schema = {
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(20).required()
    };

    return Joi.validate(req, Schema);
}

module.exports = router;