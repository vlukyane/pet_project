"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const SocketService_1 = require("../../websocket/SocketService");
const utils = require('../utils/utils');
class TodoController {
    constructor(todoService, app) {
        this.getAllTodos = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const allTodos = yield this.todoService.getAllTodos();
                return utils.sendResponse(res, {
                    data: allTodos
                }, 200);
            }
            catch (err) {
                return utils.sendResponse(res, {
                    message: 'Error occurred while getting all todos.',
                    err
                }, 400);
            }
        });
        this.getBatchOfTodos = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const continuationToken = req.params.token;
                const batchOfTodos = yield this.todoService.getBatchOfTodos(continuationToken);
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
        });
        this.getTodoById = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield this.todoService.getTodoById(req.params.id);
                return utils.sendResponse(res, {
                    data: todo
                }, 200);
            }
            catch (err) {
                return utils.sendResponse(res, {
                    message: 'Error occurred while getting todo by id.',
                    err
                }, 400);
            }
        });
        this.addNewTodo = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const newTodo = yield this.todoService.addNewTodo(req.body);
                SocketService_1.SocketService.addTodo(newTodo);
                return utils.sendResponse(res, {
                    message: 'todo added successfully',
                    newTodo
                }, 200);
            }
            catch (err) {
                return utils.sendResponse(res, {
                    message: "Some error occured while adding new todo",
                    err
                }, 400);
            }
        });
        this.deleteTodoById = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.todoService.deleteTodoById(id);
                SocketService_1.SocketService.deleteTodo(id);
                return utils.sendResponse(res, {
                    message: "Successfully delete todo"
                }, 200);
            }
            catch (err) {
                return utils.sendResponse(res, {
                    message: "Some error occured while deleting todo item",
                    err
                }, 400);
            }
        });
        this.updateTodoById = (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updatedTodo = yield this.todoService.updateTodoById(id, req.body);
                SocketService_1.SocketService.updateTodoById(id, updatedTodo);
                return utils.sendResponse(res, {
                    message: "Successfully update todo"
                }, 200);
            }
            catch (err) {
                return utils.sendResponse(res, {
                    message: "Some error occured while updating todo item",
                    err
                }, 400);
            }
        });
        this.getRoutes = () => this.router;
        this.router = express_1.Router();
        this.app = app;
        this.todoService = todoService;
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.getAllTodos);
        this.router.get('/:token', this.getBatchOfTodos);
        this.router.post('/add', this.addNewTodo);
        this.router.delete('/delete/:id', this.deleteTodoById);
        this.router.put('/update/:id', this.updateTodoById);
        this.router.get('/info/:id', this.getTodoById);
    }
}
exports.TodoController = TodoController;
