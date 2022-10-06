import { useContext } from "react"
import { profileContext } from "../context";
import Home from "./Home"
import Login from "./Login";

const LoginWrapper = () => {
    const {profile} = useContext(profileContext)
    
    return profile ? <Home/> : <Login/>;
}

export default LoginWrapper;