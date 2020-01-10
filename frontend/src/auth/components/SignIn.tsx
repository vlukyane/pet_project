import React, {useState} from "react";
import {Link} from "react-router-dom";
interface IProps {
    setter: any
}

const SignIn: React.FC<IProps> = ({setter}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signInAction = (e: any) => {
        e.preventDefault();
        console.log('FORM SUBMITTED!', email, password);
    };

    return(
        <>
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
