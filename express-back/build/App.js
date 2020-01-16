"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TodoController_1 = require("./todos/controllers/TodoController");
const TodoService_1 = require("./todos/services/TodoService");
const RepoFactory_1 = require("./todos/repo/RepoFactory");
const AuthController_1 = require("./auth/controllers/AuthController");
const AuthService_1 = require("./auth/service/AuthService");
const withContext_1 = tslib_1.__importDefault(require("./auth/middleware/withContext"));
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const port = process.env.PORT || 3001;
class App {
    static init(db) {
        const app = express();
        app.use(logger('dev'));
        app.use(cors());
        app.use(withContext_1.default);
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        const repo = RepoFactory_1.RepoFactory.create(db);
        const todoService = new TodoService_1.TodoService(repo);
        const todoController = new TodoController_1.TodoController(todoService, app);
        const authService = new AuthService_1.AuthService(repo);
        const authController = new AuthController_1.AuthController(authService, app);
        app.use('/todos', todoController.getRoutes());
        app.use('', authController.getRoutes());
        return app.listen(port, function () {
            console.log('Runnning on ' + port);
        });
    }
}
exports.App = App;
