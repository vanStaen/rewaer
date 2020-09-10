const express = require('express');
const path = require('path');
const logger = require('./helpers/logger')
const PORT = process.env.PORT || 5000;

/* var CONFIG = require('./config.json');
var dbPort = CONFIG.dbPort;
var dbHost = CONFIG.dbHost;
var dbName = CONFIG.dbName;
 */

// Init Express
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middelware 
app.use(logger);

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint routes handlers: /api/pictures
app.use('/api/pictures', require('./api/pictures'));
app.use('/api/users', require('./api/users'));

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

