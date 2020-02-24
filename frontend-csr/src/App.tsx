import React, {Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import TodoList from './todos/components/TodoList/TodoList';
import Paper from '@material-ui/core/Paper';
import {ThemeProvider} from '@material-ui/styles';
import {theme} from './theme';
import {makeStyles} from "@material-ui/core";
import SocketProvier from "./providers/SocketProvider";
import SignIn from "./auth/components/SignIn";
import SignUp from "./auth/components/SignUp";
import {useSelector} from "react-redux";

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
    const isLogged = useSelector((state: any) => state.user.isLogged);
    return (
        <SocketProvier>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Paper className={classes.container}>
                        <Switch>

                            <Route exact path={'/'} render={() =>
                                isLogged ? (
                                    <TodoList/>
                                ) : (
                                    <Redirect to={'/signin'}/>
                                )
                            }/>

                            <Route exact path={'/signin'} component={SignIn}/>
                            <Route exact path={'/signup'} component={SignUp}/>
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

