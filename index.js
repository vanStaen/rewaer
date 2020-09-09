const express = require('express');
const path = require('path');
const logger = require('./helpers/logger')
const PORT = process.env.PORT || 5000;

// Init Express
const app = express();

// Initialise Middleware function
app.use(logger);

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint handlers: /api/pictures
app.use('/api/pictures', require('./api/pictures'));
app.use('/api/users', require('./api/users'));

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));