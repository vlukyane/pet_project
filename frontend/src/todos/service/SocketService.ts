import {ITodo} from '../common/types';
import {UpdateTodoData} from '../components/TodoList/TodoList';
import {allActions} from '../actions';

const io = require('socket.io-client');

export class SocketService {
    static init () {
        return io.connect('http://localhost:3001/');
    }

    static deleteTodoById(id: string, dispatcher: any) {
        dispatcher(allActions.todo.eliminate(id));
    }

    static addTodo(todo: ITodo, dispatcher: any) {
        dispatcher(allActions.todo.add(todo));
    }

    static updateTodoById(data: UpdateTodoData, dispatcher: any) {
        const {updatedTodo, id} = data;
        const {content, isEditing, isCompleted} = updatedTodo;
        dispatcher(allActions.todo.update({content, isEditing, isCompleted, id}));
    }
}
