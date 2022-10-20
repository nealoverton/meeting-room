import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword } from "../firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setSubmitIsDisabled(!(emailIsValid && passwordIsValid))
        setLoading(false);
    }, [])

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);

        const validEmailPattern = /\S+@\S+\.\S+/

        if(validEmailPattern.test(event.target.value)){
            setEmailIsValid(true);
            setSubmitIsDisabled(!passwordIsValid);
        }else{
            setEmailIsValid(false);
            setSubmitIsDisabled(true);
        }
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);

        if(event.target.value.length >= 6){
            setPasswordIsValid(true);
            setSubmitIsDisabled(!emailIsValid);
        }else{
            setPasswordIsValid(false);
            setSubmitIsDisabled(true);
        }
    }

    const attemptLogin = async (event) => {
        event.preventDefault();

        await logInWithEmailAndPassword(email, password);
        navigate("/");
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
                {loading ? <p>Loading...</p> : <button onClick={attemptLogin} disabled={submitIsDisabled}>Log in</button>}
            </form>
            <Link to="/register">New around here? Create an account</Link>
        </div>
    )
}

export default Login;