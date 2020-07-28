const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
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
    },
    isAdmin: {
        type: Boolean
    }
});

userSchema.methods.generateAuthToken = function () {
    const accessToken = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin
    }, /*config.get(jwtPrivateKey)*/'myPrivateKey');
    return accessToken;
}

const User = mongoose.model('user', userSchema);

function validateUser(user) {
    const Schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(20).required(),
        isAdmin: Joi.boolean().required()
    };

    return Joi.validate(user, Schema);
}

exports.User = User;
exports.validateUser = validateUser;