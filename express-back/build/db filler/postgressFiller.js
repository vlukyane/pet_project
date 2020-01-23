"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PostgresDB_1 = require("../todos/repo/sql/PostgresDB");
const faker = require('faker');
const processDb = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { db, Todo, User } = yield PostgresDB_1.PostgresDB.init();
    const response = User.find();
    console.log('AA', response);
});
processDb();
