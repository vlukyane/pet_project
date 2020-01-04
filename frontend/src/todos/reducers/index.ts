import {todos} from './todos';
import {scroll} from './scroll';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
    todos,
    scroll
});
