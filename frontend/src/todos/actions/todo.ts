import {ITodo} from '../common/types';

const fetch = (id: string) => ({
    type: todoActionsNames.FETCH_TODOS,
    payload: id
});

const fetchFulfilled = (todos: ITodo[]) => {
    return {
        type: todoActionsNames.FETCH_TODOS_FULFILLED,
        payload: todos
    }
};

const add = (newTodo: any) => {
    return {
        type: todoActionsNames.ADD_TODO,
        payload: newTodo
    }
};

const save = (todos: ITodo[]) => {
    return {
        type: todoActionsNames.SAVE_TODOS,
        payload: todos
    }
};

const edit = (id: string) => {
    return {
        type: todoActionsNames.EDIT_TODO,
        payload: id
    }
};

const update = (newTodo: any) => {
    return {
        type: todoActionsNames.UPDATE_TODO,
        payload: newTodo
    }
};

const eliminate = (id: string) => {
    return {
        type: todoActionsNames.DELETE_TODO,
        payload: id
    }
};


export const todoActionsNames = {
    ADD_TODO: 'ADD_TODO',
    EDIT_TODO: 'EDIT_TODO',
    UPDATE_TODO: 'UPDATE_TODO',
    DELETE_TODO: 'DELETE_TODO',
    SAVE_TODOS: 'SAVE_TODOS',
    FETCH_TODOS: 'FETCH_TODOS',
    FETCH_TODOS_FULFILLED: 'FETCH_TODOS_FULFILLED',
    FETCH_TODOS_FAIL: 'FETCH_TODOS_FAIL',
};

export const todo = {
    add,
    edit,
    update,
    eliminate,
    save,
    fetch,
    fetchFulfilled
};
