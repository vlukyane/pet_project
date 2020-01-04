import {DB, Repo} from '../Repo';
import {ITodo, QueryResult} from '../types';

export class SequelizeRepo implements Repo {
    db: DB;
    name: string;
    constructor (db: DB) {
        this.name = 'postgres';
        this.db = db;
    }

    getAllTodos = async (): Promise<ITodo[]> => {
        try {
            return await this.db.Todo.findAll({
                limit:50
            });
        } catch (err) {
            return err;
        }
    };

    getBatchOfTodos = async (continuationToken: string): Promise<ITodo[]> => {
        try {
            return await this.db.Todo.findAndCountAll({
                where: {
                    id: {
                        ['$gt']: continuationToken
                    },
                },
                limit: 50
            })
        }
        catch (err) {
            return err;
        }
    };

    getTodoById = async (id: string): Promise<ITodo> => {
        try {
            return await this.db.Todo.findOne({
                where: { id }
            });
        } catch (err) {
            return err;
        }
    };

    addNewTodo = async (todo: ITodo): Promise<ITodo> => {
        try {
            return await this.db.Todo.create(todo);
        } catch (err) {
            return err;
        }
    };

    updateTodoById = async (id: string, todo: ITodo): Promise<void> => {
        try {
            return await this.db.Todo.update(
                {
                    content: todo.content,
                    isCompleted: todo.isCompleted
                },
                {
                    where: { id },
                }
            );
        } catch (err) {
            return err;
        }
    };

    deleteTodoById = async (id: string): Promise<QueryResult> => {
        try {
            await this.db.Todo.destroy({
                where: { id }
            });
            return { message: 'Item deleted' };
        } catch (err) {
            return err;
        }
    };
}
