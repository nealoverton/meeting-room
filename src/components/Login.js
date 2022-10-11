import { useContext } from "react";
import { profileContext } from "../context";
import { auth, logInWithEmailAndPassword } from "../firebase";
import Profile from "../models/Profile";

const Login = () => {
    const email = "test@test.com";
    const password = "123456";

    const {setProfile} = useContext(profileContext);
    const attemptLogin = async () => {
        const uid = await logInWithEmailAndPassword(email, password);
        const loggedInProfile = new Profile(uid, email)
        setProfile(loggedInProfile);
    }

    return (
        <div>
            <button onClick={attemptLogin}>Log in</button>
        </div>
    )
}

export default Login;