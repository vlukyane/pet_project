import {RepoFactory} from '../../todos/repo/RepoFactory';
import {DBTypes, getDb} from '../../index';
import {TodoService} from '../../todos/services/TodoService';
import {TodoController} from '../../todos/controllers/TodoController';
import {SocketService} from '../../websocket/SocketService';
import Todo from '../../todos/repo/mongo/models/Todo';

const expect = require('chai').expect;
const assert = require('chai').assert;
const mocks = require('node-mocks-http');
const faker = require('faker');
const sinon = require('sinon');
const express = require ('express');


export {};

describe('Repo Testing: ', () => {
    let mongoDB;
    let mongoRepo;
    let allTodos;
    let newTodo;
    let stubbedTodo;
    let addedTestTodos;
    let todoService;
    let todoController;

    before(() => {
        mongoDB = getDb(DBTypes.MONGO);
    });

    after(() => {
        // MongoDB.close();
    });

    describe('Preparing...', () => {
        it('Should return new mongo Repo', done => {
            mongoRepo = RepoFactory.create(mongoDB);
            expect(mongoRepo.name).to.include('mongo');
            done();
        });

        it('Should return new todoService', done => {
            todoService = new TodoService(mongoRepo);
            expect(todoService).to.have.property('repo');
            done();
        });

        it('Should return new todoController', done => {
            const app = express();
            todoController = new TodoController(todoService, app);
            expect(todoController).to.have.property('router');
            done();
        });
    });

    describe('Testing Repo methods', () => {
        before(async () => {
            const testTodos = [
                {
                    content: 'try to todo',
                    isCompleted: false,
                    isEditing: false
                },
                {
                    content: 'try to todo second',
                    isCompleted: false,
                    isEditing: false
                },
                {
                    content: 'try to todo third',
                    isCompleted: false,
                    isEditing: false
                },
                {
                    content: 'try to todo use force',
                    isCompleted: false,
                    isEditing: false
                },
                {
                    content: 'try to todo tototo',
                    isCompleted: false,
                    isEditing: false
                },
            ];
            addedTestTodos = await Promise.all(testTodos.map( async(todo) => {
                return await mongoRepo.addNewTodo(todo);
            }));
        });

        after(async () => {
            await Promise.all(
                addedTestTodos.map(async(todo) => await mongoRepo.deleteTodoById(todo._id))
            );
        });

        it('Should return all todos', done => {
            mongoRepo.getAllTodos().then( result => {
                expect(result).to.be.an('array');
                allTodos = result;
                done();
            });
        });

        it('Should get todo by id', done => {
            const testId = addedTestTodos[0]._id;
            mongoRepo.getTodoById(testId)
                .then( todo => {
                    expect(todo).to.have.property('_id');
                    expect(todo).to.have.property('content');
                    expect(todo).to.have.property('isCompleted');
                    expect(todo).to.have.property('isEditing');
                    done();
                })
                .catch(err => {
                    done(err);
                })
        });

        it('Should return error when wrong id for getTodoById', done => {
            try {
                const testId = '5da836550f65901ddedf6';
                mongoRepo.getTodoById(testId)
                    .then( err => {
                        expect(err.name).to.include('CastError');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    });
            }
            catch (error) {
                done(error)
            }
        });

        it('Should add new todo', done => {
            newTodo = {
                content: faker.random.words(),
                isEditing: false,
                isCompleted: false
            };
            mongoRepo.addNewTodo(newTodo)
                .then( todo => {
                    expect(todo).to.have.property('_id');
                    expect(todo).to.have.property('content');
                    expect(todo).to.have.property('isCompleted');
                    expect(todo).to.have.property('isEditing');
                    newTodo = todo;
                    mongoRepo.getTodoById(newTodo._id).then( result => {
                        expect(result.content === newTodo.content).to.be.true;
                        expect(result._id.toString() === newTodo._id.toString()).to.be.true;
                        done();
                    });
                })
                .catch(err => {
                    done(err);
                })
        });

        it('Should update todo by id', done => {
            const updatedTodo = Object.assign(addedTestTodos[1]);
            updatedTodo.content = 'Some content';
            mongoRepo.updateTodoById(updatedTodo._id, updatedTodo)
                .then( result => {
                    expect(result.ok).to.be.equal(1);
                    done();
                })
                .catch(err => {
                    done(err);
                })
        });

        it('Should delete todo by id', done => {
            mongoRepo.deleteTodoById(newTodo._id)
                .then( result => {
                    expect(result.ok).to.be.equal(1);
                    done();
                })
                .catch(err => {
                    done(err);
                })
        });

        it('Should get batch of todos', done => {
            const todo_id = addedTestTodos[0]._id;
            Todo.find().limit(1)
                .then(firstTodo => {
                    mongoRepo.getBatchOfTodos(firstTodo[0]._id)
                        .then(todosBatchFirst => {
                            expect(todosBatchFirst).to.be.an('array');
                            expect(todosBatchFirst.length <= 50).to.be.true;
                            const todo = todosBatchFirst[0];
                            expect(todo).to.have.property('_id');
                            expect(todo).to.have.property('content');
                            expect(todo).to.have.property('isCompleted');
                            expect(todo).to.have.property('isEditing');
                            mongoRepo.getBatchOfTodos(todosBatchFirst[todosBatchFirst.length - 1]._id)
                                .then(todosBatchSecond => {
                                    expect(todosBatchSecond).to.be.an('array');
                                    expect(todosBatchSecond.length <= 50).to.be.true;
                                    const todo = todosBatchSecond[0];
                                    expect(todo).to.have.property('_id');
                                    expect(todo).to.have.property('content');
                                    expect(todo).to.have.property('isCompleted');
                                    expect(todo).to.have.property('isEditing');
                                    const listOfIds = [...todosBatchFirst.map(todo => todo._id), ...todosBatchSecond.map(todo => todo._id)];
                                    const uqicIds = [...new Set(listOfIds)];
                                    expect(todosBatchFirst.length + todosBatchSecond.length === uqicIds.length).to.be.true;
                                    done();
                                })
                                .catch(err => {
                                    done(err);
                                })
                        })
                        .catch(err => {
                            done(err);
                        });
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    describe('Testing Service methods', () => {
        it('Should return stubbed all todos data', done => {
           const serviceStub = sinon.stub(todoService.repo, 'getAllTodos');
           serviceStub.returns(Promise.resolve(addedTestTodos));
           todoService.getAllTodos()
               .then( todos => {
                   expect(todos).to.be.an('array');
                   const todo = todos[0];
                   expect(todo).to.have.property('_id');
                   expect(todo).to.have.property('content');
                   expect(todo).to.have.property('isCompleted');
                   expect(todo).to.have.property('isEditing');
                   done();
               })
               .catch( err => {
                   done(err);
               });

            serviceStub.restore();
        });

        it('Should return todo by id', done => {

            stubbedTodo = {
                _id: '5da836532d50f65901ddedf6',
                content: 'try to todo third',
                isCompleted: false,
                isEditing: false
            };
           const serviceStub = sinon.stub(todoService.repo, 'getTodoById');
           serviceStub.returns(Promise.resolve(stubbedTodo));
           todoService.getTodoById(stubbedTodo._id)
               .then(todo => {
                   expect(todo).to.have.property('_id');
                   expect(todo).to.have.property('content');
                   expect(todo).to.have.property('isCompleted');
                   expect(todo).to.have.property('isEditing');
                   done();
               })
               .catch(err => {
                   done(err);
               });

            serviceStub.restore();
        });

        it('Should add new todo and return it', done => {
           const reqBody = {
               content : 'new TODO'
           };
           const newTodo = Object.assign(stubbedTodo);
           newTodo.content = reqBody.content;

           const serviceStub = sinon.stub(todoService.repo, 'addNewTodo');
           serviceStub.returns(Promise.resolve(stubbedTodo));

           todoService.addNewTodo(reqBody)
               .then(todo => {
                   expect(todo).to.have.property('_id');
                   expect(todo).to.have.property('content');
                   expect(todo).to.have.property('isCompleted');
                   expect(todo).to.have.property('isEditing');
                   done();
               })
               .catch(err => {
                  done(err)
               });

            serviceStub.restore();
        });

        it('Should delete todo and return status', done => {
           const serviceStub = sinon.stub(todoService.repo, 'deleteTodoById');
           const deletedStatus = {
               n: 1,
               ok: 1,
               deletedCount: 1
           };
           serviceStub.returns(Promise.resolve(deletedStatus));

           todoService.deleteTodoById(stubbedTodo._id)
               .then(result => {
                   expect(result.ok).to.be.equal(1);
                   done();
               })
               .catch(err => {
                   done(err);
               });

            serviceStub.restore();
        });

        it('Should update todo and return status', done => {
            const repoStub = sinon.stub(todoService.repo, 'updateTodoById');
            repoStub.returns(Promise.resolve({
                ok: 1,
            }));

            const serviceStub = sinon.stub(todoService, 'updateTodoById');
            serviceStub.returns(repoStub());
            const updatedContent = 'new string';
            todoService.updateTodoById(stubbedTodo._id, updatedContent)
                .then(result => {
                    expect(result.ok).to.be.equal(1);
                    done();
                })
                .catch(err => {
                    done(err)
                });

            serviceStub.restore();
        });
    });

    describe('Testing Controller Methods', () => {
        let req;
        let res;
        before(() => {
            req = mocks.createRequest();
            res = mocks.createResponse()
        });
        it('Should return res with all todos and code 200', done => {
            const controllerStub = sinon.stub(todoController.todoService, 'getAllTodos');
            controllerStub.returns(allTodos);
            todoController.getAllTodos(req, res)
                .then(res => {
                    const responseData = res._getData();
                    const statusCode = res.statusCode;
                    const { success, error, data } = responseData;
                    const firstTodo = data[0];
                    expect(statusCode).to.be.equal(200);
                    expect(success).to.be.true;
                    expect(error).to.be.false;
                    expect(data).to.be.an('array');
                    expect(firstTodo).to.have.property('_id');
                    expect(firstTodo).to.have.property('content');
                    expect(firstTodo).to.have.property('isCompleted');
                    expect(firstTodo).to.have.property('isEditing');
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });

        it('Should return todo by id and code 200', done => {
            const controllerStub = sinon.stub(todoController.todoService, 'getTodoById');
            controllerStub.returns(Promise.resolve({
                _id: '5da83a00b05378592f4d62e3',
                content: 'Add front',
                isCompleted: true,
                isEditing: false,
                __v: 0
            }));

            const reqWithId = Object.assign(req);
            reqWithId.params.id = '5da83a00b05378592f4d62e3';
            todoController.getTodoById(reqWithId, res)
                .then(res => {
                    const responseData = res._getData();
                    const statusCode = res.statusCode;
                    const { success, error, data } = responseData;
                    const todo = data;

                    expect(statusCode).to.be.equal(200);
                    expect(success).to.be.true;
                    expect(error).to.be.false;

                    expect(todo).to.have.property('_id');
                    expect(todo).to.have.property('content');
                    expect(todo).to.have.property('isCompleted');
                    expect(todo).to.have.property('isEditing');
                    expect(todo.content).to.include('Add front');
                    expect(todo._id).to.include('5da83a00b05378592f4d62e3');

                    done();
                })
                .catch(err => {
                    done(err);
                })
        });

        it('Should return new todo and code 200', done => {

            const reqWithTodo = Object.assign(req);
            reqWithTodo.body = {
                _id: '5da83a00b05378592f4d62e3',
                content: 'Add front',
                isCompleted: true,
                isEditing: false,
                __v: 0
            };

            const controllerStub = sinon.stub(todoController.todoService, 'addNewTodo');
            controllerStub.returns(Promise.resolve(reqWithTodo.body));
            const socketStubAddTodo = sinon.stub(SocketService, 'addTodo');
            todoController.addNewTodo(reqWithTodo, res)
               .then(res => {
                   const statusCode = res.statusCode;
                   const { success, error, newTodo } = res._getData();
                   expect(statusCode).to.be.equal(200);
                   expect(success).to.be.true;
                   expect(error).to.be.false;
                   expect(newTodo).to.have.property('_id');
                   expect(newTodo).to.have.property('content');
                   expect(newTodo).to.have.property('isCompleted');
                   expect(newTodo).to.have.property('isEditing');
                   expect(newTodo.content).to.include('Add front');
                   expect(newTodo._id).to.include('5da83a00b05378592f4d62e3');
                   done();
               })
               .catch(err => {
                   done(err);
               })
        });

        it('Should delete todo by id and send code 200', done => {
            const reqWithId = Object.assign(req);
            reqWithId.params.id = '5da83a00b05378592f4d62e3';

            const serviceStub = sinon.stub(todoController.todoService, 'deleteTodoById');
            const socketStub = sinon.stub(SocketService, 'deleteTodo');
            todoController.deleteTodoById(reqWithId, res)
                .then(res => {
                    const statusCode = res.statusCode;
                    const { success, error, message } = res._getData();
                    expect(statusCode).to.be.equal(200);
                    expect(success).to.be.true;
                    expect(error).to.be.false;
                    expect(message).to.include('Successfully delete todo');
                    done();
                })
                .catch(err => {
                    done(err);
                })
        });

        it('Should update todo by id and send code 200', done => {
            const reqWithId = Object.assign(req);
            reqWithId.params.id = '5da83a00b05378592f4d62e3';

            const serviceStub = sinon.stub(todoController.todoService, 'updateTodoById');
            const socketStub = sinon.stub(SocketService, 'updateTodoById');

            todoController.updateTodoById(reqWithId, res)
                .then(res => {
                    const statusCode = res.statusCode;
                    const { success, error, message } = res._getData();
                    expect(statusCode).to.be.equal(200);
                    expect(success).to.be.true;
                    expect(error).to.be.false;
                    expect(message).to.include('Successfully update todo');
                    done();
                })
                .catch(err => {
                    done(err);
                });
            socketStub.restore();
            serviceStub.restore();
        });

        it('Should return error when updating todo by id and send code 400', done => {
            const reqWithId = Object.assign(req);
            reqWithId.params.id = '5da83a00b05378592f4d62e3';

            const serviceStub = sinon.stub(todoController.todoService, 'updateTodoById');
            const socketStub = sinon.stub(SocketService, 'updateTodoById');

            serviceStub.returns(Promise.reject({error: 'Some error'}));
            todoController.updateTodoById(reqWithId, res)
                .then(res => {

                    const statusCode = res.statusCode;
                    const { success, error, message } = res._getData();
                    expect(statusCode).to.be.equal(400);
                    expect(success).to.be.false;
                    expect(error).to.be.true;
                    expect(message).to.include('Some error occured while updating todo item');
                    done();
                })
                .catch(err => {
                    done(err);
                })
        });
    });
});
