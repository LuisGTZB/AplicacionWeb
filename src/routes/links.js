const express = require('express');
const pool = require('../database');
const router = express.Router();

require('../database');

router.get('/add', (req, res) => {
    res.render('products/add');
});

router.post('/add', async(req, res) => {
    const { productname, description, price } = req.body;

    const newProduct = {
        productname,
        description,
        price
    };
    await pool.query('INSERT INTO products set ?', [newProduct]);
    res.redirect('/products');
});

router.get('/', async(req, res) => {
    const productos = await pool.query('SELECT * FROM products');
    console.log(productos)
    res.render('products/list', {productos})
});

module.exports = router;

