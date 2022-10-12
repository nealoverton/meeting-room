import { useContext, useEffect, useState } from "react";
import { authContext } from "../authContext";
import { logOut } from "../firebase";
import { getProfileData } from "../firestore";
import Profile from "../models/Profile";

const Home = () => {
    const {authentication} = useContext(authContext);
    const [profile, setProfile] = useState();

    useEffect(() => {
        getProfileData(authentication.uid)
        .then((dbData) => {
            const loggedInProfile = new Profile(authentication.uid, authentication.email, dbData.name, dbData.colour)
        
        setProfile(loggedInProfile);
        })
        
    }, [])


    return (
        <div>
            <h1>Home</h1>
            {!profile ? <p>Loading...</p> : (
                <ul>
                    {Object.keys(profile).map((setting, index) => {
                        return <li key={index}>{setting + ":  " + profile[setting]}</li>
                    })}
                </ul>
            )}
            
            <button onClick={() => logOut()}>Log out</button>
        </div>
    )
}

export default Home;