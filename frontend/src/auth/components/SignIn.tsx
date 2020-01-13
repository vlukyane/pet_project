import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {AuthService} from "../service/AuthService";
import {useDispatch} from "react-redux";
import {allActions} from "../../todos/actions";
interface IProps {
    setter: any
}

const SignIn: React.FC<IProps> = ({setter}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatcher = useDispatch();
    const signInAction = async (e: any) => {
        e.preventDefault();
        const {error, data } = await AuthService.logIn(email, password);
        if (error) {
            console.log(error);
            return;
        }
        dispatcher(allActions.user.logIn(email, data));
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
