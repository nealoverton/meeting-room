import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword } from "../firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const navigate = useNavigate();

    const attemptLogin = async (event) => {
        event.preventDefault();

        await logInWithEmailAndPassword(email, password);
        navigate("/");
    }

    useEffect(() => {
        if(password.length >= 6){
            setPasswordIsValid(true);
        } else{
            setPasswordIsValid(false);
        } 

        const validEmail = /\S+@\S+\.\S+/

        if(validEmail.test(email)){
            setEmailIsValid(true);
        }else{
            setEmailIsValid(false)
        } 
    }, [email, password])

    return (
        <div>
            <h1>Log in</h1>
            <form>
                <label>
                    Email:
                    <input type="text" name="email" onChange={(event) => setEmail(event.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={(event) => setPassword(event.target.value)}/>
                </label>
                <button onClick={attemptLogin} disabled={!(emailIsValid && passwordIsValid)}>Log in</button>
            </form>
            <Link to="/register">New around here? Create an account</Link>
        </div>
    )
}

export default Login;