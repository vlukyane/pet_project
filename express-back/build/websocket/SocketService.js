"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
class SocketService {
    static addTodo(todo) {
        Object.keys(index_1.wssClients).forEach((socketId) => {
            index_1.wssClients[socketId].emit('addTodo', todo);
        });
    }
    static deleteTodo(id) {
        Object.keys(index_1.wssClients).forEach((socketId) => {
            index_1.wssClients[socketId].emit('deleteTodoById', id);
        });
    }
    static updateTodoById(id, updatedTodo) {
        Object.keys(index_1.wssClients).forEach((socketId) => {
            index_1.wssClients[socketId].emit('updateTodoById', { id, updatedTodo });
        });
    }
}
exports.SocketService = SocketService;
