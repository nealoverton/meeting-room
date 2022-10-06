import { useContext } from "react";
import { profileContext } from "../context";
import { logInWithEmailAndPassword } from "../firebase";

const Login = () => {
    const email = "test@test.com";
    const password = "123456";

    const {setProfile} = useContext(profileContext);
    const attemptLogin = async () => {
        const loggedInProfile = await logInWithEmailAndPassword(email, password);
        setProfile(loggedInProfile);
    }

    return (
        <div>
            <button onClick={attemptLogin}>Log in</button>
        </div>
    )
}

export default Login;