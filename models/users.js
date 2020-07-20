const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('user', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
}));

function validateUser(user) {
    const Schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(20).required()
    };

    return Joi.validate(user, Schema);
}

exports.User = User;
exports.validateUser = validateUser;