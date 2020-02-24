import {combineEpics} from 'redux-observable';
import {todoFetchEpic} from './todoEpic';

export const rootEpic = combineEpics(
    todoFetchEpic
);
