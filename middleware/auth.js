const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).send('Access denied. Token not found...');

    try {
        const decode = jwt.verify(token, /*config.get(jwtPrivateKey)*/'myPrivateKey');
        req.user = decode;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid Token...');
    }
}

module.exports = auth;