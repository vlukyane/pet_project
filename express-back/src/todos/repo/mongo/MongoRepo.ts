import {ITodo} from '../types';
import Todo from './models/Todo';
import {QueryResult} from '../types';
import {Repo} from '../Repo';
import {DB} from '../Repo';
import {Mongoose} from 'mongoose';

export class MongoRepo implements Repo {
    db: Mongoose;
    name: string;
    constructor (db: DB) {
        this.name = 'mongo';
        this.db = db.db
    }

    getAllTodos = async (): Promise<ITodo[]> => {
        try {
            return await Todo.find().limit(50);
        } catch (err) {
            // console.log('ERR IN REPO: ', err);
            return err;
        }
    };

    getBatchOfTodos = async (continuationToken: string): Promise<ITodo[]> => {
        try {
            return await Todo.find({
                '_id' : {$gt: continuationToken}
            }).limit(50);
        }
        catch (err) {
            return err;
        }
    };

    getTodoById = async (id: string): Promise<ITodo> => {
        try {
            return await Todo.findOne({
                "_id": id
            });
        } catch (err) {
            // console.log('ERR IN REPO: ', err);
            return err;
        }
    };

    addNewTodo = async (todo: ITodo): Promise<ITodo> => {
        try {
            let newTodo = new Todo(todo);
            return await newTodo.save();
        } catch (err) {
            // console.log('Error occurred while adding new todo in repo.', err);
            return err;
        }
    };

    deleteTodoById = async (id: string): Promise<QueryResult> => {
        try {
            return await Todo.deleteOne({
                "_id" : id
            });
        } catch (err) {
            // console.log('Error occurred while deleting todo in repo', err);
            return err;
        }
    };

    updateTodoById = async (id: string, editedTodo: ITodo): Promise<void> => {
        try {
            const updatedTodo = new Todo(editedTodo);
            return await Todo.updateOne(
                {
                    "_id": id
                },
                {
                    "content": updatedTodo.content,
                    "isCompleted": updatedTodo.isCompleted
                }
            );
        } catch (err) {
            // console.log('Error occurred while updating todo in repo', err);
            return err;
        }
    };
}
