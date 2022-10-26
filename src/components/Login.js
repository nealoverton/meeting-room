import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword } from "../firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const navigate = useNavigate();

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);

        const validEmailPattern = /\S+@\S+\.\S+/

        if(validEmailPattern.test(event.target.value)){
            setEmailIsValid(true);
        }else{
            setEmailIsValid(false);
        }
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);

        if(event.target.value.length >= 6){
            setPasswordIsValid(true);
        }else{
            setPasswordIsValid(false);
        }
    }

    const attemptLogin = async (event) => {
        event.preventDefault();

        if(!passwordIsValid) {
            setShowPasswordError(true);
        }
        if(!emailIsValid){
            setShowEmailError(true);
        }

        if(emailIsValid && passwordIsValid){
            await logInWithEmailAndPassword(email, password);
            navigate("/");
        }
    }

    return (
        <div>
            <h1>Log in</h1>
            <form>
                <label>
                    Email:
                    <input type="text" name="email" onChange={handleChangeEmail} onBlur={()=>{setShowEmailError(!emailIsValid)}}/>
                    {showEmailError? <p>this doesn't look right (eg. somebody@somewhere.com)</p> : <></>}
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={handleChangePassword} onBlur={()=>{setShowPasswordError(!passwordIsValid)}}/>
                    {showPasswordError? <p>password must be at least 6 characters long</p> : <></>}
                </label>
                <button onClick={attemptLogin} >Log in</button>
            </form>
            <Link to="/register">New around here? Create an account</Link>
        </div>
    )
}

export default Login;