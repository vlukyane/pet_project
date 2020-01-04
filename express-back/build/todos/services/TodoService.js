"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class TodoService {
    constructor(repo) {
        this.getAllTodos = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.repo.getAllTodos();
        });
        this.getBatchOfTodos = (continuationToken) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.repo.getBatchOfTodos(continuationToken);
        });
        this.getTodoById = (id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.repo.getTodoById(id);
        });
        this.addNewTodo = (reqBody) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { content } = reqBody;
            const todo = {
                content,
                isCompleted: false,
                isEditing: false
            };
            return yield this.repo.addNewTodo(todo);
        });
        this.deleteTodoById = (id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.repo.deleteTodoById(id);
        });
        this.updateTodoById = (id, reqBody) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const todo = {
                content: reqBody.content,
                isCompleted: reqBody.isCompleted,
                isEditing: reqBody.isEditing
            };
            yield this.repo.updateTodoById(id, todo);
            return todo;
        });
        this.repo = repo;
    }
}
exports.TodoService = TodoService;
