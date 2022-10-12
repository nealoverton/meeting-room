import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../authContext";
import { logInWithEmailAndPassword } from "../firebase";

const Login = () => {
    const { setAuthentication } = useContext(authContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleChange = (event, stateSetter) => {
        stateSetter(event.target.value);
    }

    const attemptLogin = async (event) => {
        event.preventDefault();

        const uid = await logInWithEmailAndPassword(email, password);
        await setAuthentication(uid);
        navigate("/");
    }

    return (
        <div>
            <h1>Log in</h1>
            <form>
                <label>
                    Email:
                    <input type="text" name="email" onChange={(event) => handleChange(event, setEmail)}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={(event) => handleChange(event, setPassword)}/>
                </label>
                <button onClick={attemptLogin}>Log in</button>
            </form>
            <Link to="/register">New around here? Create an account</Link>
        </div>
    )
}

export default Login;