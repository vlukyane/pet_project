"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
class SocketService {
    static addTodo(todo) {
        console.log('__________________________');
        console.log('__________________________');
        console.log('__________________________');
        console.log('__________________________');
        console.log('__________________________');
        console.log('__________________________');
        console.log(Object.keys(index_1.wssClients));
        console.log('__________________________');
        console.log('__________________________');
        console.log('__________________________');
        console.log('__________________________');
        console.log('__________________________');
        console.log('__________________________');
        Object.keys(index_1.wssClients).forEach((socketId) => {
            index_1.wssClients[socketId].emit('addTodo', todo);
        });
    }
    static deleteTodo(id) {
        Object.keys(index_1.wssClients).forEach((socketId) => {
            index_1.wssClients[socketId].emit('deleteTodoById', id);
        });
    }
    static updateTodoById(id, updatedTodo, ctx) {
        Object.keys(index_1.wssClients).forEach((socketId) => {
            index_1.wssClients[socketId].emit('updateTodoById', { id, updatedTodo, ctx });
        });
    }
}
exports.SocketService = SocketService;
