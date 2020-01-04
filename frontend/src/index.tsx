import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './todos/reducers';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createEpicMiddleware} from 'redux-observable';
import {rootEpic} from './todos/epics/rootEpic';

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

epicMiddleware.run(rootEpic);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
