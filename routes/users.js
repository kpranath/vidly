const _ = require('lodash');
const { User, validateUser } = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const sha256 = require('sha256');

// creating a new user
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists...');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    user.password = sha256(user.password);

    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router;