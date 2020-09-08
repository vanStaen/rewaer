const express = require('express');
const path = require('path');
const test = require('./test');
const logger = require('./helpers/logger')
const PORT = process.env.PORT || 5000;


// Init Express
const app = express();

// Initialise Middleware function
app.use(logger);

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint handlers : /api/pics
app.get('/api/pics', (req, res) => {
    const picJson = [
        { id: 0, pic: 'pic1.jpg' },
        { id: 1, pic: 'pic2.jpg' },
        { id: 2, pic: 'poic3.jpg' }
    ];
    res.json(picJson);
});

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT} `));




console.log(test);