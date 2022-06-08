const express = require('express');
const router = express.Router();

require('../database');

router.get('/add', (req, res) => {
    res.render('links/add')
});

router.post('/add', (req, res) => {
    res.send('recived')
});


module.exports = router;

