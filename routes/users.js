const _ = require('lodash');
const { User, validateUser } = require('../models/users');
const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/async');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const sha256 = require('sha256');

//getting current user
router.get('/me', auth, asyncMiddleware(async (req, res) => {
    const user = req.user;
    res.send(user);
}));

// creating a new user
router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists...');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });

    // user = new User(_.pick(req.body, ['name', 'email', 'password', isAdmin]));

    user.password = sha256(user.password);

    await user.save();

    const accessToken = user.generateAuthToken();

    res.header('x-auth-token', accessToken).send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));

}));

module.exports = router;