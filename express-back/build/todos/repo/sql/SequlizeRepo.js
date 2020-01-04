"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class SequelizeRepo {
    constructor(db) {
        this.getAllTodos = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.Todo.findAll({
                    limit: 50
                });
            }
            catch (err) {
                return err;
            }
        });
        this.getBatchOfTodos = (continuationToken) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.Todo.findAndCountAll({
                    where: {
                        id: {
                            ['$gt']: continuationToken
                        },
                    },
                    limit: 50
                });
            }
            catch (err) {
                return err;
            }
        });
        this.getTodoById = (id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.Todo.findOne({
                    where: { id }
                });
            }
            catch (err) {
                return err;
            }
        });
        this.addNewTodo = (todo) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.Todo.create(todo);
            }
            catch (err) {
                return err;
            }
        });
        this.updateTodoById = (id, todo) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.Todo.update({
                    content: todo.content,
                    isCompleted: todo.isCompleted
                }, {
                    where: { id },
                });
            }
            catch (err) {
                return err;
            }
        });
        this.deleteTodoById = (id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.Todo.destroy({
                    where: { id }
                });
                return { message: 'Item deleted' };
            }
            catch (err) {
                return err;
            }
        });
        this.name = 'postgres';
        this.db = db;
    }
}
exports.SequelizeRepo = SequelizeRepo;
