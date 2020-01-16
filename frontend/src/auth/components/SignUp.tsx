import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {AuthService} from "../service/AuthService";

interface IProps {
}

const SignUp: React.FC<IProps> = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
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
            <form onSubmit={ (e) => signInAction(e)}>
                <input type={'text'} name={'email'} onChange={e => setEmail(e.target.value)}/>
                <input type={'password'} name={'password'} onChange={e => setPassword(e.target.value)}/>
                <input type='submit' value={'SIGN UP!'} />
            </form>
            <Link to={'/signIn'}> Go back to sign in </Link>
        </>
    )
};

export default SignUp;
