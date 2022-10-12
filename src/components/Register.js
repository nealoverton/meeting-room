import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../authContext";
import { register } from "../firebase";
import { addProfile } from "../firestore";
import Profile from "../models/Profile";

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [colour, setColour] = useState();
    const { setAuthentication } = useContext(authContext);
    const navigate = useNavigate();

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

            if(uid){
                addProfile(uid, name, colour);
                const loggedInUserProfile = new Profile(uid, email, name, colour);
                setAuthentication(loggedInUserProfile);
                navigate("/")
            }     
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
            <Link to="/login">Already have an account? Log in</Link>
        </div>
    )
}

export default Register;