// // import {server} from '../../index';
//
// const expect = require('chai').expect;
// const request = require('supertest');
//
// export {};
// describe('GET /todos', () => {
//
//     it('Should return all todos', (done) => {
//         request("http://localhost:3001").get('/todos')
//             .then(res => {
//                 const allTodos = res.body.data;
//                 const success = res.body.success;
//                 const err = res.body.error;
//                 expect(allTodos).to.be.an('array');
//                 expect(success).to.be.true;
//                 expect(err).to.be.false;
//                 done();
//             })
//             .catch((err) => done(err));
//
//     });
//
//     it('Should return error on wrong get route', (done) => {
//         request("http://localhost:3001").get('/todosss')
//             .then(res => {
//                 const err = res.statusCode;
//                 expect(err).to.equal(404);
//                 done();
//             })
//             .catch(err => done(err));
//     })
// });
