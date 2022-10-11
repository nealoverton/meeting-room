import {
    doc,
    setDoc
  } from 'firebase/firestore';
  import { fireStoreDB } from './firebase';

  const addProfile = async (uid, name = 'test name', colour = 'blue') => {
    const newProfileRef = doc(fireStoreDB, 'profiles', uid);
  
    return await setDoc(newProfileRef, { name, colour });
  };

  export {
    addProfile
  }