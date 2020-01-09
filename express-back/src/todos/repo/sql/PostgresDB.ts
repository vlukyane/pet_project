import { DB } from '../Repo';
import {Sequelize} from 'sequelize';

export class PostgresDB {
    static init(): DB {
        const psql = new Sequelize('TodosDatabase', 'vlukyane', '', {
            host: 'localhost',
            dialect: 'postgres',
            define: {
                timestamps: false,
            },
        });

        psql.authenticate()
            .then(() => {
                console.log('Connection to postgres has been established successfully.');
            })
            .catch((err) => {
                console.error('Unable to connect to the database:', err);
            });

        const Todo = psql.define('Todo',{
            content: {
                type: Sequelize.STRING,
            },
            isCompleted: {
                type: Sequelize.BOOLEAN,
            },
            isEditing: {
                type: Sequelize.BOOLEAN,
            },
        });
        return {
            db: psql,
            type: 'postgres',
            Todo,
        };
    }
}
