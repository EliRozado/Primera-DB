const express = require('express')
const prodRouter = require('./productos.js')
const msgFunctions = require('./mensajes')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const { Contenedor } = require('./contenedor.js')

// * variables
const productosDB = './db/productos.json'
const listaProductos = new Contenedor(productosDB)
const mensajesDB = 'mensajes.json';
const mensajes = msgFunctions.traerMensajes(mensajesDB)
const app =  express()
const http = new HTTPServer(app)
const io = new SocketServer(http)

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('views'))
app.use('/productos', prodRouter)


io.on('connection', (socket) => {
    console.log('nuevo usuario: ' + socket.id)
    socket.emit('mensajes', mensajes)

    socket.emit('productos', listaProductos.getAll())
    
    socket.on('new_msg', data => {
        mensajes.push(data)
        msgFunctions.guardarMensajes(mensajesDB, mensajes)

        io.sockets.emit('mensajes', mensajes)
    })

    socket.on('new_prod', data => {
        listaProductos.save(data)
        io.sockets.emit('productos', listaProductos.getAll())
    })
})

http.listen(8080, () => {
    console.log('server init')
})