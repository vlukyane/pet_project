"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Todo_1 = tslib_1.__importDefault(require("../todos/repo/mongo/models/Todo"));
const mongoose = require('mongoose');
const faker = require('faker');
mongoose.connect('mongodb://127.0.0.1:27017/todos_huge');
Todo_1.default.find()
    .then(res => {
    console.log('RES', res.length);
});
