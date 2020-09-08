const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000;

// Init Express
const app = express();

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint handlers : /api/pics
app.get('/api/pics', function (req, res) {
    const usersJson = [
        { id: 0, pic: 'theresa1.jpg' },
        { id: 1, pic: 'theresa2.jpg' },
        { id: 2, pic: 'theresa3.jpg' }
    ];
    res.send(usersJson);
});

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));