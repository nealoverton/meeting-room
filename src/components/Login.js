import { useContext } from "react";
import { userContext } from "../context";
import { logInWithEmailAndPassword } from "../firebase";

const Login = () => {
    const email = "test@test.com";
    const password = "123456";

    const {setUser} = useContext(userContext);
    const attemptLogin = async () => {
        const uid = await logInWithEmailAndPassword(email, password);
        setUser(uid);
    }

    return (
        <div>
            <button onClick={attemptLogin}>Log in</button>
        </div>
    )
}

export default Login;