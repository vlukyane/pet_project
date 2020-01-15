import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {AuthService} from "../service/AuthService";
import {useDispatch} from "react-redux";
import {allActions} from "../../todos/actions";
import {CookieService} from "../service/CookieService";
interface IProps {
}

const SignIn: React.FC<IProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatcher = useDispatch();

    useEffect(() => {
        (async () => {
            const userCookie = await CookieService.get('sign_in');
            if (!userCookie) return;
            const cookieData = JSON.parse(userCookie);
            if (cookieData === '') return;
            dispatcher(allActions.user.logIn(cookieData.email, cookieData.token));
            history.push('/');
        })()
    }, []);

    const signInAction = async (e: any) => {
        e.preventDefault();
        const {error, token } = await AuthService.logIn(email, password);
        if (error) {
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
            <form onSubmit={ (e) => signInAction(e)}>
                <input type={'text'} name={'email'} onChange={e => setEmail(e.target.value)}/>
                <input type={'password'} name={'password'} onChange={e => setPassword(e.target.value)}/>
                <input type='submit' value={'Log in'} />
            </form>
            <Link to={'/signUp'}> sign up! </Link>
        </>
    )
};

export default SignIn;
