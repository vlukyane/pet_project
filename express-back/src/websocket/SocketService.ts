import {wssClients} from '../index';
import {ITodo} from '../todos/repo/types';
export class SocketService {
    static addTodo(todo) {
        Object.keys(wssClients).forEach( (socketId: string) => {
            wssClients[socketId].emit('addTodo', todo );
        });
    }

    static deleteTodo(id: string) {
        Object.keys(wssClients).forEach( (socketId: string) => {
            wssClients[socketId].emit('deleteTodoById', id );
        });
    }

    static updateTodoById(id: string, updatedTodo: ITodo, ctx: string) {
        console.log('CTX IN SOCKET: ', ctx);
        Object.keys(wssClients).forEach( (socketId: string) => {
            wssClients[socketId].emit('updateTodoById', { id, updatedTodo, ctx });
        });
    }
}
