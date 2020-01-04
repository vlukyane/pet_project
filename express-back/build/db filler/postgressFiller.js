"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PostgresDB_1 = require("../todos/repo/sql/PostgresDB");
const faker = require('faker');
const processDb = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { db, Todo } = yield PostgresDB_1.PostgresDB.init();
    while (Todo !== undefined) {
        console.log(Todo);
        for (let j = 0; j < 100; j++) {
            let todos = [];
            for (let i = 0; i < 10000; i++) {
                const newTodo = {
                    content: faker.random.words(),
                    isEditing: false,
                    isCompleted: false
                };
                todos.push(newTodo);
            }
            const result = yield Todo.bulkCreate(todos);
            console.log(result.length);
        }
        break;
    }
});
processDb();
