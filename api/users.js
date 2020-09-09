const express = require('express');
const router = express.Router();
const users = require('../helpers/mockData/mockDataUsers');

// GET all pictures
router.get('/', (req, res) => {
    res.json(users);
});

// GET single picture (based on id)
router.get('/:id', (req, res) => {
    const found = users.some(users => users.id === parseInt(req.params.id));
    if (found) {
        res.json(users.filter(users => users.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ error: `No user found with id#${req.params.id}` })
    }
});

module.exports = router;