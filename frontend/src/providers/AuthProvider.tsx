import React, {useState} from "react";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

interface IProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<IProps> = ({children}) => {



    return (
        <>
            <Route exact path={'/'}>

            </Route>
        </>
    )
};

export default AuthProvider;
