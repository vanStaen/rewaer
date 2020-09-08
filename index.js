const express = require('express');
const path = require('path');
const test = require('./test');
const uuid = require('uuid');
const moment = require('moment');
const fs = require("fs");
const PORT = process.env.PORT || 5000;


// Init Express
const app = express();

// Logging function
const logger = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const logLine = uuid.v4() + ' - ' + moment().format("DD/MM/YYYY, H:mm:ss") + ' > GET: ' + url + '\r\n';
    fs.appendFile(path.join(__dirname, 'log.txt'), logLine, 'utf8', err => {
        if (err) throw err;
    });
    next();
};

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