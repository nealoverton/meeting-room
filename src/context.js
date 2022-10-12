import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { auth } from "./firebase";

const profileContext = createContext();

function ProfileProvider({children}) {
  const [profile, setProfile] = useState();
  const [pending, setPending] = useState(true);
  const value = {profile, setProfile};
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setProfile(user);
      setPending(false);
    })
  }, [])

  return pending ? <p>Loading...</p> : <profileContext.Provider value={value}>{children}</profileContext.Provider>
}

export {ProfileProvider, profileContext};