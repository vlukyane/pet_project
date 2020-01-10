import React, {useState} from "react";
import {Link} from "react-router-dom";
import {AuthService} from "../service/AuthService";

interface IProps {
    setter: any
}

const SignUp: React.FC<IProps> = ({setter}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signInAction = async (e: any) => {
        e.preventDefault();
        const response = await AuthService.getLogIn(email, password);
        console.log('FORM SUBMITTED!', email, password, response);

    };

    return(
        <>
            <form onSubmit={ (e) => signInAction(e)}>
                <input type={'text'} name={'email'} onChange={e => setEmail(e.target.value)}/>
                <input type={'password'} name={'password'} onChange={e => setPassword(e.target.value)}/>
                <input type='submit' value={'SET UP!'} />
            </form>
            <Link to={'/signIn'}> Go back to sign in </Link>
        </>
    )
};

export default SignUp;
