import logo from "../images/logo-cat.jpg";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../authContext";
import { createProfileFromUser } from "../firestore";
import Settings from "./Settings";

const Navbar = () => {
  const { currentUser } = useContext(authContext);
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  useEffect(() => {
    (async () => {
      const currentProfile = await createProfileFromUser(currentUser);
      setProfile(currentProfile);
      setIsLoading(false);
    })();
  }, []);
  const handleAvatarClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <nav>
      <div>
        <img src={logo} alt={"Logo"}></img>
      </div>
      <div>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <img
            src={profile.avatar}
            alt={"user avatar"}
            onClick={handleAvatarClick}
          ></img>
        )}
      </div>
      <div>
        {isSettingsOpen ? (
          <Settings
            name={profile.name}
            avatar={profile.avatar}
            colour={profile.colour}
          ></Settings>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
