// JS Express exemple

const express = require('express');

// Init Express
const app = express();

// Root: endpoint handlers
app.get('/', function (req, res) {
    res.send('Root of the app!');
});

// Api pics: endpoint handlers
app.get('/api/pics', function (req, res) {
    const usersJson = [
        { id: 0, pic: 'theresa1.jpg' },
        { id: 1, pic: 'theresa2.jpg' },
        { id: 2, pic: 'theresa3.jpg' }
    ];
    res.send(usersJson);
});

// Listen on a port
app.listen(process.env.PORT || 5000);