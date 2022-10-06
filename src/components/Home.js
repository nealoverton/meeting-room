import { useContext } from "react";
import { userContext } from "../context";

const Home = () => {
    const {user} = useContext(userContext)
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome {user}</p>
        </div>
    )
}

export default Home;