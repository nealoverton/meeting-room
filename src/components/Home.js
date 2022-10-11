import { useContext } from "react";
import { profileContext } from "../context";

const Home = () => {
    const {profile} = useContext(profileContext)
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome {profile.email}</p>
        </div>
    )
}

export default Home;