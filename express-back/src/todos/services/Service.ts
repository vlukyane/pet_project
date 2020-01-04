import {ITodo} from '../repo/types';
import {QueryResult} from '../repo/types';

export interface Service {
    getAllTodos(): Promise<ITodo[]>;

    getNextTodos(lastId: string): Promise<ITodo[]>;

    getTodoById(id: string): Promise<ITodo>;

    addNewTodo(todo: ITodo): Promise<ITodo>;

    deleteTodoById(id: string): Promise<QueryResult>;

    updateTodoById(id: string, todo: ITodo): Promise<ITodo>;
}
