import {Repo} from '../../todos/repo/Repo';
import User from "../../todos/repo/mongo/models/User";
import bcrypt from "bcrypt";

const jwt = require('jsonwebtoken');

export class AuthService {
    repo: Repo;

    constructor(repo: Repo) {
        this.repo = repo;
    }

    signIn = async (userEmail: string, userPassword: string) => {
        const foundedUser = await User.findOne({email: userEmail});
        if (foundedUser) {
            try {
                const comparer = await bcrypt.compare(userPassword, foundedUser.password);
                if (comparer) {
                    const JWTToken = jwt.sign(
                        {
                            email: foundedUser.email,
                            _id: foundedUser._id,
                        },
                        'secret',
                    );
                    return {
                        data: {
                            success: 'Token created!',
                            error: null,
                            token: JWTToken,
                        },
                        code: 200,
                    };
                }
                return {
                    data: {
                        success: null,
                        error: 'Wrong email or password',
                    },
                    code: 500,
                };
            } catch (err) {
                return {
                    data: {
                        success: null,
                        error: err,
                    },
                    code: 500,
                };
            }
        }
    }

    signUp = async (userEmail: string, userPassword: string) => {
        try {
            const hashedPassword = await bcrypt.hash(userPassword, 10);
            const newUser = new User({
                email: userEmail,
                password: hashedPassword,
            });
            await newUser.save();
            return {
                data: {
                    success: 'new user created',
                },
                code: 200,
            };
        } catch (err) {
            return {
                data: {
                    error: err,
                },
                code: 500,
            };
        }
    }
}
