import { useContext } from "react"
import { profileContext } from "../context";
import Home from "./Home"
import Login from "./Login";
import Register from "./Register";
import { auth } from "../firebase";

const LoginWrapper = () => {
    const {profile} = useContext(profileContext)
    
    return auth.currentUser ? <Home/> : <Register/>;
}

export default LoginWrapper;