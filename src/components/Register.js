import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../firebase";
import { addProfileData } from "../firestore";

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [avatar, setAvatar] = useState(null)

    const colourOptions = [
        "blue",
        "red",
        "green",
        "fuschia",
        "teal",
        "purple"
    ]
    const [colour, setColour] = useState(colourOptions[0]);

    const navigate = useNavigate();

    const handleChange = (event, stateSetter) => {
        stateSetter(event.target.value);
    }

    const handleFileInput = (event) => {
        if(event.target.files[0]){
            setAvatar(event.target.files[0]);
        } else {
            setAvatar(null);
        }
        
    }

    const attemptRegistration = async (event) => {
        event.preventDefault();

        const uid = await registerWithEmailAndPassword(email, password);
        
        await addProfileData(uid, name, colour, avatar);
        navigate("/");
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
                    Avatar:
                    <input type="file" onChange={handleFileInput}/>
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