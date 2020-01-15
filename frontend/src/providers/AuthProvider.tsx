import React from "react";
import {Route, Redirect, Switch} from 'react-router-dom';
import {useSelector} from "react-redux";
import SignIn from "../auth/components/SignIn";
import SignUp from "../auth/components/SignUp";

interface IProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<IProps> = ({children}) => {

    const isLogged = useSelector((state: any) => state.user.isLogged);
    return (
        <Switch>
            <Route exact path={'/'} render={() =>
                isLogged ? (
                    {children}
                ) : (
                    <Redirect to={'/signin'}/>
                )
            }/>
            <Route exact path={'/signIn'} component={SignIn}/>
            <Route exact path={'/signUp'} component={SignUp}/>
        </Switch>
    );
};

export default AuthProvider;
