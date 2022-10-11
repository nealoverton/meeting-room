import Home from "./Home"
import Login from "./Login";
import { auth } from "../firebase";

const LoginWrapper = () => {
    
    return auth.currentUser ? <Home/> : <Login/>;
}

export default LoginWrapper;