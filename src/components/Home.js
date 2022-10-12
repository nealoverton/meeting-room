import { useContext } from "react";
import { authContext } from "../authContext";
import { logOut } from "../firebase";

const Home = () => {
    const {authentication} = useContext(authContext)
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome {authentication.email}</p>
            <button onClick={() => logOut()}>Log out</button>
        </div>
    )
}

export default Home;