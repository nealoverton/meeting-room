import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Profile from "./models/Profile";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_API_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const register = async (email, password) => {
  const response = await createUserWithEmailAndPassword(auth, email, password)

  return response.user.uid
}

const logInWithEmailAndPassword = async (email, password) => {
  const response = await signInWithEmailAndPassword(auth, email, password);

  return createProfileFromFirebaseUser(response.user);
}

const logOut = () => {
  return signOut(auth)
}

const createProfileFromFirebaseUser = (firebaseUser) => {
  const currentProfile =  new Profile(firebaseUser.uid, firebaseUser.email);
  return currentProfile;
}


export {
  auth,
  register,
  logInWithEmailAndPassword,
  logOut
};