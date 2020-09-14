const express = require('express');
const path = require('path');
const logger = require('./helpers/logger')
const PORT = process.env.PORT || 5000;

// Init Express
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middelware 
app.use(logger);

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/routes.log', (req, res) => {
    res.sendFile(path.join(__dirname, 'routes.log'));
});

// Endpoint routes handlers: /api/pictures
app.use('/api/pictures', require('./api/pictures'));
app.use('/api/users', require('./api/users'));

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

