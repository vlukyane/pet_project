import {PostgresDB} from '../todos/repo/sql/PostgresDB';
const faker = require('faker');

const processDb = async () => {
    const {db, Todo} = await PostgresDB.init();
    while (Todo !== undefined) {
        console.log(Todo);
        for (let j = 0; j < 100; j++) {
            let todos = [];
            for (let i = 0; i < 10000; i++) {
                const newTodo = {
                    content: faker.random.words(),
                    isEditing: false,
                    isCompleted: false
                };
                // @ts-ignore
                todos.push(newTodo);
            }
            const result = await Todo.bulkCreate(todos);
            console.log(result.length);
        }
        break;
    }
};

processDb();
