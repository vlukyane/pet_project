import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {AuthService} from "../service/AuthService";
import {useDispatch} from "react-redux";
import {allActions} from "../../todos/actions";
import {CookieService} from "../service/CookieService";
import {Input, makeStyles, Button} from "@material-ui/core";

const useStyles = makeStyles({
    inputForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signIn: {
        margin: '10px 0 20px 0',
        maxWidth: '90px',
    },
    signUp: {
        textDecoration: 'none',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#333333',
        textTransform: 'uppercase',
    },
    greySpan: {
        pointerEvents: 'none',
        fontSize: '13px',
        lineHeight: '1.5',
        color: '#666666',
    },
    credentialsSpan: {
        fontSize: '14px',
        color: '#333333',
        lineHeight: '1.5',
    },
    wrapInput: {
        display: 'flex',
        flexDirection: 'column'
    },
    inputField: {
        fontSize: '16px',
        color: '#333333',
        lineHeight: '1.2',
        display: 'block',
        width: '100%',
        height: '37px',
        background: 'transparent',
        padding: '0 7px 0 0',
        marginBottom: '10px',
    },
    errorSpan: {
        pointerEvents: 'none',
        fontSize: '13px',
        lineHeight: '1.5',
        color: '#aa0914',
    }
});


const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const classes = useStyles();
    const dispatcher = useDispatch();

    useEffect(() => {
        (async () => {
            const userCookie = await CookieService.get('sign_in');
            if (!userCookie) return;
            console.log(userCookie);
            const cookieData = JSON.parse(userCookie);
            if (cookieData === '') return;
            dispatcher(allActions.user.logIn(cookieData.email, cookieData.token));
            history.push('/');
        })()
    }, []);

    const signInAction = async (e: any) => {
        e.preventDefault();
        const response = await AuthService.signIn(email, password);
        const {error, token} = response;
        if (error) {
            setError(error);
            console.log(error);
            return;
        }
        dispatcher(allActions.user.logIn(email, token));
        CookieService.set('sign_in', {email, token}, {});
        history.push('/');
    };

    return(
        <>
            <h1> SIGN IN </h1>
            <form className={classes.inputForm} onSubmit={ (e) => signInAction(e)}>
                <div className={classes.wrapInput} data-validate="Username is required">
                    <span className={classes.credentialsSpan}>Username</span>
                    <Input
                        className={classes.inputField}
                        type={'text'}
                        name={'email'}
                        placeholder={"Type your username"}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <span className={classes.credentialsSpan}>Password</span>
                    <Input
                        className={classes.inputField}
                        type={'password'}
                        name={'password'}
                        placeholder={"Type your password"}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <span className={classes.errorSpan}>
                    {error}
                </span>
                <Button className={classes.signIn} type='submit' value={''}>
                    Sign in
                </Button>
            </form>
            <span className={classes.greySpan}>
                Have not account yet?
            </span>
            <Link className={classes.signUp} to={'/signUp'}>
                Create your Account ->
            </Link>
        </>
    )
};

export default SignIn;
