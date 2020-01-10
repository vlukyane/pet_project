import {DB} from './todos/repo/Repo';
import {TodoController} from './todos/controllers/TodoController';
import {TodoService} from './todos/services/TodoService';
import {RepoFactory} from './todos/repo/RepoFactory';
import {AuthController} from "./auth/controllers/AuthController";
import {AuthService} from "./auth/service/AuthService";

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require ('express');
const logger = require('morgan');
const port = process.env.PORT || 3001;

export class App {

    static init(db: DB) {

        const app = express();
        app.use(logger('dev'));
        app.use(cors());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        const repo = RepoFactory.create(db);
        const todoService = new TodoService(repo);
        const todoController = new TodoController(todoService, app);
        const authService = new AuthService(repo);
        const authController = new AuthController(authService, app);

        app.use('/todos', todoController.getRoutes());
        app.use('', authController.getRoutes());

        return app.listen(port, function() {
            console.log('Runnning on ' + port);
        });
    }
}
