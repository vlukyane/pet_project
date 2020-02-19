import {Express, Router} from 'express';

const utils = require('../../todos/utils/utils');

export class AuthController {
    service: any;
    app: Express;
    router: Router;
    constructor(authService: any, app: Express) {
        this.service = authService;
        this.router = Router();
        this.app = app;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/signin', this.signIn);
        this.router.post('/signup', this.signUp);
    }

    public getRoutes = () => this.router;

    public signIn = async (req, res) => {
        const {userPassword, userEmail} = req.body;
        const response = await this.service.signIn(userEmail, userPassword);
        const {data, code} = response;
        return utils.sendResponse(res, data, code);
    }

    public signUp = async (req: any, res) => {
        const {userPassword, userEmail} = req.body;
        const response = await this.service.signUp(userEmail, userPassword);
        const {data, code} = response;
        return utils.sendResponse(res, data, code);
    }
}
