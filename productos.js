const express = require("express")
const { Router } = express;
const { Contenedor } = require('./contenedor.js')

const router = Router();
const productosDB = './db/productos.json'
const listaProductos = new Contenedor(productosDB)

router.get('/', (req, res) => {
    // devuelve todos los productos
    const productos = listaProductos.getAll()
    res.render('index', {productos})
})

router.post('/', (req, res) => {
    // recibe y agrega un producto, y lo devuelve con su id asignado
    const { title, price, thumbnail } = req.body

    const producto = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }

    listaProductos.save(producto)
    const productos = listaProductos.getAll()
    
    res.render('index', {productos})
})

module.exports = router;