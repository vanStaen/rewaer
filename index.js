const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('./helpers/logger');
const PORT = process.env.PORT || 5000;
require('dotenv/config');

// Init Express
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middelware 
app.use(logger);

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Static pointing to the logs
app.get('/log', (req, res) => {
    res.sendFile(path.join(__dirname, 'routes.log'));
});

// Endpoint routes handlers:
app.use('/api/users', require('./api/users'));
app.use('/api/looks', require('./api/looks'));
app.use('/api/items', require('./api/items'));
// Special kid : GraphQL
app.use('/graphql', require('./api/graphql'));

// Connect to Mongo db
mongoose.connect(
    process.env.DB_REWAER_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db!')
)

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

