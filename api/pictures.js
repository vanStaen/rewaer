const express = require('express');
const router = express.Router();

const pics = [
    { id: 0, pic: 'pic1.jpg' },
    { id: 1, pic: 'pic2.jpg' },
    { id: 2, pic: 'pic3.jpg' }
];

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
        res.status(400).json({ error: `No picture found with id ${req.params.id}` })
    }
});

module.exports = router;