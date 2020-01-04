import {ITodo} from '../repo/types';
import {QueryResult} from '../repo/types';

export interface Controller {
    getAllTodos(req: any, res: any): Promise<ITodo[]>;
    getBatchOfTodos(req: any, res: any): Promise<ITodo[]>;
    addNewTodo(req: any, res: any): Promise<ITodo>;
    deleteTodoById(req: any, res: any): Promise<QueryResult>;
    updateTodoById(req: any, res: any): Promise<void>;
}
