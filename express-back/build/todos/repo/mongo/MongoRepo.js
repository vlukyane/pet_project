"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Todo_1 = tslib_1.__importDefault(require("./models/Todo"));
class MongoRepo {
    constructor(db) {
        this.getAllTodos = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield Todo_1.default.find().limit(50);
            }
            catch (err) {
                return err;
            }
        });
        this.getBatchOfTodos = (continuationToken) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield Todo_1.default.find({
                    '_id': { $gt: continuationToken }
                }).limit(50);
            }
            catch (err) {
                return err;
            }
        });
        this.getTodoById = (id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield Todo_1.default.findOne({
                    "_id": id
                });
            }
            catch (err) {
                return err;
            }
        });
        this.addNewTodo = (todo) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let newTodo = new Todo_1.default(todo);
                return yield newTodo.save();
            }
            catch (err) {
                return err;
            }
        });
        this.deleteTodoById = (id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield Todo_1.default.deleteOne({
                    "_id": id
                });
            }
            catch (err) {
                return err;
            }
        });
        this.updateTodoById = (id, editedTodo) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTodo = new Todo_1.default(editedTodo);
                return yield Todo_1.default.updateOne({
                    "_id": id
                }, {
                    "content": updatedTodo.content,
                    "isCompleted": updatedTodo.isCompleted
                });
            }
            catch (err) {
                return err;
            }
        });
        this.name = 'mongo';
        this.db = db.db;
    }
}
exports.MongoRepo = MongoRepo;
