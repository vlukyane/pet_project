"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket = require('socket.io');
class SocketServer {
    static init(server) {
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
exports.SocketServer = SocketServer;
