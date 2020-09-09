const express = require('express');
const router = express.Router();
const users = require('../helpers/mockData');

// GET all pictures
router.get('/', (req, res) => {
    res.json(users);
});

// GET single picture (based on id)
router.get('/:id', (req, res) => {
    const found = users.some(pic => pic.id === parseInt(req.params.id));
    if (found) {
        res.json(users.filter(pic => pic.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ error: `No picture found with id ${req.params.id}` })
    }
});

module.exports = router;