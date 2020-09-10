const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const moment = require('moment');
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
        res.status(400).json({ error: `No user found with id#${req.params.id}` });
    }
});

// POST add users
router.post('/', (req, res) => {

    const newUser = {
        id: uuid.v4(),
        userName: req.body.userName,
        googleId: req.body.googleId,
        dateCreated: moment().format("DD/MM/YYYY, H:mm:ss"),
        statusActive: true
    }

    if (!newUser.userName || !newUser.googleId) {
        return res.status(400).json({ error: `Error: Some field are missing.` });
    }

    users.push(newUser);
    res.json(users);

});

module.exports = router;