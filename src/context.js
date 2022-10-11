import { createContext } from "react";
import { useState } from "react";

const profileContext = createContext();

function ProfileProvider({children}) {
    const [profile, setProfile] = useState();
    const value = {profile, setProfile}
    return <profileContext.Provider value={value}>{children}</profileContext.Provider>
  }

  export {ProfileProvider, profileContext};