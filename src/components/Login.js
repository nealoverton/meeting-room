import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profileContext } from "../context";
import { logInWithEmailAndPassword } from "../firebase";
import Profile from "../models/Profile";

const Login = () => {
    const { setProfile } = useContext(profileContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleChange = (event, stateSetter) => {
        stateSetter(event.target.value);
    }

    const attemptLogin = async (event) => {
        event.preventDefault();

        const uid = await logInWithEmailAndPassword(email, password);

        if(uid){
            const loggedInUserProfile = new Profile(uid, email)
            setProfile(loggedInUserProfile);
            navigate("/");
        }  
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
            <Link to="/Register">New around here? Create an account</Link>
        </div>
    )
}

export default Login;