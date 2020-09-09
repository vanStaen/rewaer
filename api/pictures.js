const express = require('express');
const router = express.Router();
const pics = require('../helpers/mockData/mockDataPics');

// GET all pictures
router.get('/', (req, res) => {
    res.json(pics);
});

// GET single picture (based on id)
router.get('/:id', (req, res) => {
    const found = pics.some(pic => pic.id === parseInt(req.params.id));
    if (found) {
        res.json(pics.filter(pic => pic.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ error: `No picture found with id#${req.params.id}` })
    }
});

// POST add pictures
router.post('/', (req, res) => {
    res.send(res.body);
});

module.exports = router;