const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/database')();
// enable this code when envi vae is set
// require('./startup/config')();
require('./startup/validation');

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening to port ${port}...`));