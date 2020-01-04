import {Service} from '../services/Service';
import {Controller} from './Controller';
import {ITodo, QueryResult} from '../repo/types';
import {TodoService} from '../services/TodoService';
import {Express, Router} from 'express';
import {SocketService} from '../../websocket/SocketService';

const utils = require('../utils/utils');

export class TodoController implements Controller {
    todoService: Service;
    router: Router;
    app: Express;

    constructor(todoService: TodoService, app: Express)  {
        this.router = Router();
        this.app = app;
        this.todoService = todoService;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', this.getAllTodos);
        this.router.get('/:token', this.getBatchOfTodos);
        this.router.post('/add', this.addNewTodo);
        this.router.delete('/delete/:id', this.deleteTodoById);
        this.router.put('/update/:id', this.updateTodoById);
        this.router.get('/info/:id', this.getTodoById)
    }

    getAllTodos = async (req, res): Promise<ITodo[]> => {
        try {
            const allTodos = await this.todoService.getAllTodos();
            return utils.sendResponse(res, {
                data: allTodos
            }, 200);
        } catch (err) {
            return utils.sendResponse(res, {
                message: 'Error occurred while getting all todos.',
                err
            }, 400);
        }
    };

    getBatchOfTodos = async (req: any, res: any): Promise<ITodo[]> => {
      try{
          const continuationToken = req.params.token;
          const batchOfTodos = await this.todoService.getBatchOfTodos(continuationToken);
          return utils.sendResponse(res, {
              data: batchOfTodos
          }, 200);
      }
      catch (err) {
          return utils.sendResponse(res, {
              message: 'Error occurred while getting all todos.',
              err
          }, 400);
      }
    };

    getTodoById = async (req, res): Promise<ITodo> => {
        try {
          const todo = await this.todoService.getTodoById(req.params.id);
          return utils.sendResponse(res, {
              data: todo
          }, 200);
      } catch (err) {
          return utils.sendResponse(res, {
              message: 'Error occurred while getting todo by id.',
              err
          }, 400);
      }
    };

    addNewTodo = async (req, res): Promise<ITodo> => {
        try {
            const newTodo = await this.todoService.addNewTodo(req.body);
            SocketService.addTodo(newTodo);

            return utils.sendResponse(res,{
                message: 'todo added successfully',
                newTodo
            }, 200);
        } catch (err) {
            return utils.sendResponse(res,{
                message: "Some error occured while adding new todo",
                err
            }, 400);
        }

    };

    deleteTodoById = async (req: any, res: any): Promise<QueryResult> => {
        try {
            const id: string = req.params.id;

            await this.todoService.deleteTodoById(id);
            SocketService.deleteTodo(id);

            return utils.sendResponse(res,{
                message: "Successfully delete todo"
            }, 200)
        } catch (err) {
            return utils.sendResponse(res,{
                message: "Some error occured while deleting todo item",
                err
            }, 400);
        }
    };

    updateTodoById = async (req: any, res: any): Promise<void> => {
        try {
            const id: string = req.params.id;

            const updatedTodo = await this.todoService.updateTodoById(id, req.body);
            SocketService.updateTodoById(id, updatedTodo);

            return utils.sendResponse(res,{
                message: "Successfully update todo"
            }, 200)
        } catch (err) {
            return utils.sendResponse(res,{
                message: "Some error occured while updating todo item",
                err
            }, 400)
        }
    };

    getRoutes = () => this.router;

}
