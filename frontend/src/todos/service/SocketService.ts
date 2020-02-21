import {ITodo} from '../common/types';
import {UpdateTodoData} from '../components/TodoList/TodoList';
import {allActions} from '../actions';

// @ts-ignore
const TODOS_URL = process.env.TODOS_BACKEND_SERVICE_HOST;
const io = require('socket.io-client');

export class SocketService {
    static init () {
        return io.connect(`${TODOS_URL}`, {
            path: '/api/socket.io'
        });
    }

    static deleteTodoById(id: string, dispatcher: any) {
        dispatcher(allActions.todo.eliminate(id));
    }

    static addTodo(todo: ITodo, dispatcher: any) {
        dispatcher(allActions.todo.add(todo));
    }

    static updateTodoById(data: UpdateTodoData, dispatcher: any) {
        const {updatedTodo, id, ctx} = data;
        const {content, isEditing, isCompleted} = updatedTodo;
        dispatcher(allActions.todo.update({content, isEditing, isCompleted, id, ctx}));
    }
}
