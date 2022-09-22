const socket = io.connect()
let productos = []

function renderChat(data){
    const html = data.map(msg => `<li>
    <span class="email">${msg.email}</span> 
    <span class="date">[${msg.date}]</span>: 
    <span class="message">${msg.message}</span></li>`).join(" ")
    document.getElementById('mensajes').innerHTML = html
}

function renderProducts(data){
    const html = data.map(producto => `<tr>
        <td>${producto.title}</td>
        <td>${producto.price}</td>
        <td><img src="${producto.thumbnail}" class="img-thumbnail rounded" style="max-width:100px;"/></td>
    </tr>`).join(" ")
    document.getElementById('productos').innerHTML = html
}

socket.on('mensajes', data => { renderChat(data) })
socket.on('productos', data => { 
    renderProducts(data);
    data.forEach(product => productos.push(product) )
});

function enviarMensaje(event){
    const date = new Date().toLocaleString()
    const email = document.getElementById('email').value;
    const msg = document.getElementById('message').value;
    document.getElementById('message').value = '';
    socket.emit('new_msg', {email: email, date: date, message: msg})
    return false;
}

function enviarProducto(event){
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbnail').value = '';
    socket.emit('new_prod', {title: title, price: price, thumbnail: thumbnail})
    return false;
}

