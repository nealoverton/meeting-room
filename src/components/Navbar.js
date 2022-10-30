import logo from "../images/logo-cat.jpg";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../authContext";
// import Profile from "../models/Profile";
import { createProfileFromUser } from "../firestore";

const Navbar = () => {
  const { currentUser } = useContext(authContext);
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const currentProfile = await createProfileFromUser(currentUser);
      setProfile(currentProfile);
      setIsLoading(false);
    })();
  }, []);

  return (
    <nav>
      <div>
        <img src={logo} alt={"Logo"}></img>
      </div>
      <div>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <img src={profile.avatar} alt={"user avatar"}></img>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
