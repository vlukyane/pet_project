import {Express, Router} from 'express';
import bcrypt from 'bcrypt';
import User from "../../todos/repo/mongo/models/User";
import jwt from 'jsonwebtoken';

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
        const foundedUser = await User.findOne({email: userEmail});
        if (foundedUser) {
            bcrypt.compare(userPassword, foundedUser.password, async (err, result) => {
                if (err) {
                    return utils.sendResponse(res, {
                        success: null,
                        error: err,
                    }, 500);
                }
                if (result) {
                    const JWTToken = jwt.sign(
                        {
                            email: foundedUser.email,
                            _id: foundedUser._id,
                        },
                        'secret');
                    console.log('??', JWTToken, userPassword, foundedUser.password, result);
                    return utils.sendResponse(res, {
                        success: 'Token created!',
                        error: null,
                        data: JWTToken,
                    }, 200);
                }
                return utils.sendResponse(res, {
                    success: null,
                    error: 'Wrong email or password',
                }, 500);
            });
        } else {
            return utils.sendResponse(res, {
                error: 'User does not exist',
            }, 500);
        }
    }

    public signUp = async (req: any, res) => {
        const {userPassword, userEmail} = req.body;
        bcrypt.hash(userPassword, 10, async (err, hashedPassword) => {
            if (err) {
                return utils.sendResponse(res, {
                    error: err,
                }, 500);
            } else {
                const newUser = new User({
                    email: userEmail,
                    password: hashedPassword,
                });
                try {
                    const response =  await newUser.save();
                    return res.status(200).json({
                        success: 'new user created',
                    });
                } catch (err) {
                    console.log('ERROR! ', err);
                    return utils.sendResponse(res, {
                        error: err,
                    }, 500);
                }
            }
        });
    }
}
