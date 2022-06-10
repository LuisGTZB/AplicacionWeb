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
    req.flash('exito', 'Producto almacenado correctamente');
    res.redirect('/products');
});

router.get('/', async(req, res) => {
    const productos = await pool.query('SELECT * FROM products');
    console.log(productos)
    res.render('products/list', {productos})
});

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE ID = ?', [id]);
    //console.log(req.params.id)
    req.flash('exito', 'Producto eliminado correctamente');
    res.redirect('/products')
});

router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const product = await pool.query('SELECT * FROM products WHERE ID = ?', [id]);
    //console.log(product[0])
    
    res.render('products/edit', {product: product[0]});
});

router.post('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const { productname, description, price } = req.body;
    const newProduct = {
        productname,
        description,
        price
    };
    console.log(newProduct);
    await pool.query('UPDATE products set ? WHERE id = ?', [newProduct, id]);
    req.flash('exito', 'Producto actualizado correctamente');
    res.redirect('/products')
    res.send('updated')

});

module.exports = router;

