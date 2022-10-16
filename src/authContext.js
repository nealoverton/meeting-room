import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { auth } from "./firebase";

const authContext = createContext();

function AuthProvider({children}) {
  const [authentication, setAuthentication] = useState();
  const [pending, setPending] = useState(true);
  const value = {authentication, setAuthentication};
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthentication(user);
      setPending(false);
    })
  }, [])

  return pending ? <p>Loading...</p> : <authContext.Provider value={value}>{children}</authContext.Provider>
}

export {AuthProvider, authContext};