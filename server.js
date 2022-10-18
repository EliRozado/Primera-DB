import MySQLCon from "./config/mysqlConfig.js";
import SQLiteCon from "./config/sqliteConfig.js";
import express from "express";
import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import DBContainer from "./containers/prodContainer.js";
import MSGContainer from "./containers/msgContainer.js";
import prodRouter from "./routes/productRoutes.js";

const app = express();
const http = new HTTPServer(app)
const io = new Server(http)

const port = process.env.Port || 8080;
const DB = new DBContainer(MySQLCon, "productos")
const MSG = new MSGContainer(SQLiteCon, "mensajes")

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('views'))
app.use('/productos', prodRouter)

io.on('connection', async (socket) => {
    console.log('nuevo usuario: ' + socket.id)
    socket.emit('mensajes', await MSG.getAll())

    socket.emit('productos', await DB.getAll())
    
    socket.on('new_msg', async data => {
        MSG.saveMSG(data);
        io.sockets.emit('mensajes', await MSG.getAll())
    })

    socket.on('new_prod', async (data) => {
        await DB.addProduct(data);
        io.sockets.emit('productos', await DB.getAll())
    })
})

http.listen(port, () => {
    console.log(`conectado por ${port}`)
})