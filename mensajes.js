const fs = require('fs')

const traerMensajes = function (archivo){
    const mensajes = []

    try{
        const data = JSON.parse(fs.readFileSync(`./db/${archivo}`, 'utf-8'))
        data.forEach(msg => mensajes.push(msg))
    } catch(err) {
        console.log('No habia mensajes en la base de datos.')
    }

    return mensajes;
}

const guardarMensajes = function (archivo, mensajes){
    fs.writeFileSync(`./db/${archivo}`, JSON.stringify(mensajes, null, 2))
    return;
}

module.exports = {
    traerMensajes, guardarMensajes
}