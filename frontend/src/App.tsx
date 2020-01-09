import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TodoList from './todos/components/TodoList/TodoList';
import Paper from '@material-ui/core/Paper';
import {ThemeProvider} from '@material-ui/styles';
import {theme} from './theme';
import TodoHeader from './todos/components/TodoHeader/TodoHeader';
import {makeStyles} from "@material-ui/core";
import SocketProvier from "./providers/SocketProvider";

const TodoInfo = React.lazy(() => import('./todos/lazy-components/TodoInfo/TodoInfo'));

const renderLoader = () => (
    <p> Loading..</p>
);

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        margin: '15px auto 0 auto',
        paddingBottom: '15px',
        marginBottom: '15px',
        maxWidth: '600px'
    }
});

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <SocketProvier>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Paper className={classes.container}>
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
        </SocketProvier>
    );
};

export default App;
