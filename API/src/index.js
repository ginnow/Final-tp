const express = require('express');
const cors = require('cors');
const server = express();
const socketio = require('socket.io');

/* VARIABLES OS UTILS */
var osu = require('node-os-utils');
var cpu = osu.cpu;
var mem = osu.mem;
var netstat = osu.netstat;
var drive = osu.drive;

server.set('port', process.env.PORT || 5000);

server.use(express.json());

server.use(cors());


const servidor = server.listen(server.get('port'), () => {
    console.log('Servidor corriendo en el puerto :', server.get('port'));
});

const socket = socketio(servidor);

socket.on('connection', (socket) => {

    setInterval(() => {

        /* PC FISICA */
        cpu.free()

        .then(info => {

            socket.emit('cpu', info)

        });

        mem.info()

        .then(info => {

            socket.emit('ram', info)
        });

        netstat.stats()

        .then(info => {

            socket.emit('conexionlo', info[0])
            socket.emit('conexionwan', info[1])
        });

        drive.info()
            .then(info => {

                socket.emit('hdd', info)
            });


    }, 1000);
});

server.use(require('./routes/route.cliente'));

server.use(require('./routes/route.equipo'));

console.log('Servidor funcionando correctamente en puerto', server.get('port'));