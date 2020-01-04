import {DB} from '../Repo';

const mongoose = require('mongoose');

export class MongoDB {
    static init (): DB {
        mongoose.connect('mongodb://127.0.0.1:27017/todos_huge', {useNewUrlParser: true});
        mongoose.connection.once('open', function() {
            console.log('Connection to mongoDB has been established successfully');
        });
        return {
            db :mongoose,
            type :'mongo'
        };
    }
}

