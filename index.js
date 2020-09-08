const express = require('express');
const path = require('path');
const test = require('./test');
const logger = require('./helpers/logger')
const PORT = process.env.PORT || 5000;

const pics = [
    { id: 0, pic: 'pic1.jpg' },
    { id: 1, pic: 'pic2.jpg' },
    { id: 2, pic: 'pic3.jpg' }
];

// Init Express
const app = express();

// Initialise Middleware function
app.use(logger);

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint handlers: Get ALL pictures
app.get('/api/pics', (req, res) => {
    res.json(pics);
});

// Endpoint handlers: Get single picture (based on id)
app.get('/api/pics/:id', (req, res) => {
    const found = pics.some(pic => pic.id === parseInt(req.params.id));
    if (found) {
        res.json(pics.filter(pic => pic.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ error: `No picture found with id ${req.params.id}` })
    }
});

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




console.log(test);