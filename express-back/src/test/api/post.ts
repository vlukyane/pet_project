// const expect = require('chai').expect;
// const request = require('supertest');
// const faker = require('faker');
//
// export {};
// describe('POST /todos', () => {
//
//     it('Should add new todo', (done) => {
//         const uuid = faker.random.uuid();
//         const newTodo = {
//             id: uuid,
//             _id: uuid,
//             content: faker.random.words(),
//             isEditing: false,
//             isCompleted: false
//         };
//         // request("http://localhost:3001").get('/todos');
//         // const allTodo = allTodoRaw.body.data;
//         // console.log(allTodo);
//
//         request("http://localhost:3001").post('/todos/add')
//             .send(newTodo)
//             .then(res => {
//                 done();
//             })
//             .catch((err) => done(err));
//
//     });
// });
