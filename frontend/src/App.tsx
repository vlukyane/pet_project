import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TodoList from './todos/components/TodoList/TodoList';
import Paper from '@material-ui/core/Paper';
import {ThemeProvider} from '@material-ui/styles';
import {theme} from './theme';
import TodoHeader from './todos/components/TodoHeader/TodoHeader';

const TodoInfo = React.lazy(() => import('./todos/lazy-components/TodoInfo/TodoInfo'));

const renderLoader = () => (
    <p> Loading..</p>
);

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Paper className="container">
                    <TodoHeader/>
                    <Switch>
                        <Route exact path={'/'} render={() =>
                            <TodoList/>
                        }/>
                        <Suspense fallback={() => renderLoader()}>
                            <Route path='/todo/:todoId' component={TodoInfo}/>
                        </Suspense>
                    </Switch>
                </Paper>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
