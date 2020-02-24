import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {AuthService} from "../service/AuthService";
import {Button, Input, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    inputForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 20px 0 20px',
        border: 'solid black 1px'
    },
    signUp: {
        margin: '10px 0 20px 0',
        maxWidth: '90px',
        border: 'solid black 0.5px'
    },
    backButton: {
        textDecoration: 'none',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#333333',
        textTransform: 'uppercase',
        marginTop: '10px',
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
    }
});

const SignUp: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const classes = useStyles();

    const signInAction = async (e: any) => {
        e.preventDefault();
        const {success} = await AuthService.signUp(email, password);
        if (success === 'new user created') {
            history.push('/signin');
        }
    };

    return(
        <>
            <h1> SIGN UP </h1>
            <form className={classes.inputForm} onSubmit={ (e) => signInAction(e)}>
                <Input
                    type={'text'}
                    className={classes.inputField}
                    name={'email'}
                    placeholder={"Type your username"}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    className={classes.inputField}
                    type={'password'}
                    name={'password'}
                    placeholder={"Type your password"}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button className={classes.signUp} type='submit'>
                    Sign up
                </Button>
            </form>
            <Link className={classes.backButton} to={'/signIn'}> Go back to sign in </Link>
        </>
    )
};

export default SignUp;
