import {ITodo, QueryResult} from '../repo/types';
import {Repo} from '../repo/Repo';
import {Service} from './Service';
import {copyFileSync} from 'fs';

export class TodoService implements Service {
    repo: Repo;

    constructor(repo: Repo) {
        this.repo = repo;
    }

    getAllTodos = async (): Promise<ITodo[]> => {
        return await this.repo.getAllTodos();
    };

    getBatchOfTodos = async(continuationToken: string): Promise<ITodo[]> => {
        return await this.repo.getBatchOfTodos(continuationToken);
    };

    getTodoById = async (id: string): Promise<ITodo> => {
        return await this.repo.getTodoById(id);
    };

    addNewTodo = async (reqBody): Promise<ITodo> => {
        const { content } = reqBody;
        const todo: ITodo = {
            content,
            isCompleted: false,
            isEditing: false
        };
        return await this.repo.addNewTodo(todo);
    };

    deleteTodoById = async (id: string): Promise<QueryResult> =>{
        return await this.repo.deleteTodoById(id);
    };

    updateTodoById = async (id: string, reqBody) =>{
        const todo: ITodo = {
            content: reqBody.content,
            isCompleted: reqBody.isCompleted,
            isEditing: reqBody.isEditing
        };
        await this.repo.updateTodoById(id, todo);
        return todo;
    };
}
