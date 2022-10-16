import { useContext, useEffect, useState } from "react";
import { authContext } from "../authContext";
import { logOut } from "../firebase";
import { createProfileFromUser } from "../firestore";

const Home = () => {
    const {authentication} = useContext(authContext);
    const [profile, setProfile] = useState();

    useEffect(() => {
        createProfileFromUser(authentication)
        .then((profileData) => {
            setProfile(profileData);
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
            {!profile ? <p>Loading...</p> : <img src={profile.avatar} alt={"User Avatar"}/> }           
            <button onClick={() => logOut()}>Log out</button>
        </div>
    )
}

export default Home;