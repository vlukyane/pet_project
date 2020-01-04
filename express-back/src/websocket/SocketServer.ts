import {Express} from 'express';
const socket = require('socket.io');

export class SocketServer {

    static init(server: Express) {
        const io = socket(server);
        const clients = {};

        io.on('connection', (socket) => {
            clients[socket.id] = socket;
            console.log('CONNECTORS: ', Object.keys(clients));
            socket.on('disconnect', () => {
                delete clients[socket.id];
                console.log('USER DISCONNECTED, CURRENT USERS: ', Object.keys(clients));
            });
        });
        return clients;
    }
}
