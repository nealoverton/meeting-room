import { useContext, useState } from "react";
import { profileContext } from "../context";
import { auth, register } from "../firebase";
import { addProfile } from "../firestore";
import Profile from "../models/Profile";

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [colour, setColour] = useState();
    const { setProfile } = useContext(profileContext);

    const colourOptions = [
        "blue",
        "red"
    ]

    const handleChange = (event, stateSetter) => {
        stateSetter(event.target.value);
    }

    const attemptRegistration = async (event) => {
        event.preventDefault();
        
        try{
            const uid = await register(email, password);
            addProfile(uid, name, colour);
            const newProfile = new Profile(uid, email, name, colour);
            setProfile(newProfile);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Sign up below</h1>
            <form onSubmit={attemptRegistration}>
                <label>
                    Name:
                    <input type="text" name="name" onChange={(event) => handleChange(event, setName)}/>
                </label>
                <label>
                    Email:
                    <input type="text" name="email" onChange={(event) => handleChange(event, setEmail)}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={(event) => handleChange(event, setPassword)}/>
                </label>
                <label>
                    Colour:
                    <select onChange={(event) => handleChange(event, setColour)}>
                        {colourOptions.map((colourOption, index) => {
                            return <option value={colourOption} key={index}>
                                {colourOption}
                            </option>
                        })}
                    </select>
                </label>
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register;