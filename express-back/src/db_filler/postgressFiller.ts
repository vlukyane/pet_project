import {PostgresDB} from '../todos/repo/sql/PostgresDB';
const faker = require('faker');

const processDb = async () => {
    const {db, Todo, User} = await PostgresDB.init();
    const response = User.find();
    console.log('AA', response);
    // while (Todo !== undefined) {
    //     for (let j = 0; j < 100; j++) {
    //         let todos = [];
    //         for (let i = 0; i < 1000; i++) {
    //             const newTodo = {
    //                 content: faker.random.words(),
    //                 isEditing: false,
    //                 isCompleted: false,
    //             };
    //             @ts-ignore
                // todos.push(newTodo);
            // }
            // const result = await Todo.bulkCreate(todos);
        // }
        // break;
    // }
};

processDb();
