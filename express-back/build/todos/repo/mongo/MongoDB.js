"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
class MongoDB {
    static init() {
        mongoose.connect('mongodb://127.0.0.1:27017/todos_huge', { useNewUrlParser: true });
        mongoose.connection.once('open', function () {
            console.log('Connection to mongoDB has been established successfully');
        });
        return {
            db: mongoose,
            type: 'mongo'
        };
    }
}
exports.MongoDB = MongoDB;
