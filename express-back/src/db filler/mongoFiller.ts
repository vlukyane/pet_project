import Todo from '../todos/repo/mongo/models/Todo';

const mongoose = require('mongoose');
const faker = require('faker');

mongoose.connect('mongodb://127.0.0.1:27017/todos_huge');

// Todo.remove()
//     .then(res => {
//         console.log('OPAAA', res);
//     });

Todo.find()
    .then(res => {
        console.log('RES', res.length);
    });

// const processDb = async () => {
//     for (let j = 0; j < 100; j++) {
//         let todos = [];for (let i = 0; i < 10000; i++) {
//             const newTodo = {
//                 content: faker.random.words(),
//                 isEditing: false,
//                 isCompleted: false
//             };
//             // @ts-ignore
//             todos.push(newTodo);
//         }
//         const result = await Todo.insertMany(todos);
//         console.log(j, 'ADDED');
//     }
// };
//
//
//
//
// processDb();
