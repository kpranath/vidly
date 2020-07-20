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

    const passWord = sha256(req.body.password);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: passWord
    });

    await user.save();

    res.send(user);

});

module.exports = router;