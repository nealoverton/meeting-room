import { useContext } from "react"
import { userContext } from "../context";
import Home from "./Home"
import Login from "./Login";

const LoginWrapper = () => {
    const {user} = useContext(userContext)
    
    return user ? <Home/> : <Login/>;
}

export default LoginWrapper;