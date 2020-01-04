"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Todo = new Schema({
    content: {
        type: String
    },
    isCompleted: {
        type: Boolean
    },
    isEditing: {
        type: Boolean
    }
});
Todo.set('toJSON', {
    virtuals: true
});
exports.default = mongoose_1.default.model('Todo', Todo);
