import {ITodo} from './types';
import {QueryResult} from './types';

export interface Repo {

    getAllTodos() :Promise<ITodo[]>;

    getBatchOfTodos(continuationToken: string): Promise<ITodo[]>;

    getTodoById(id: string) :Promise<ITodo>;

    addNewTodo(todo :ITodo) :Promise<ITodo>;

    deleteTodoById(id :string) :Promise<QueryResult>;

    updateTodoById(id :string, todo :ITodo) :Promise<void>;

}

export interface DB {
    db :any;
    Todo ?:any;
    type :string
}

