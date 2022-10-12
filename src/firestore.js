import {
    doc,
    setDoc,
    getDoc
  } from 'firebase/firestore';
  import { fireStoreDB } from './firebase';

  const addProfileData = async (uid, name = 'test name', colour = 'blue') => {
    const newProfileRef = doc(fireStoreDB, 'profiles', uid);
  
    return await setDoc(newProfileRef, { name, colour });
  };

  const getProfileData = async (uid) => {
    const profileRef = doc(fireStoreDB, 'profiles', uid);
    const profileSnapshot = await getDoc(profileRef);

    return profileSnapshot.data();
  }

  export {
    addProfileData,
    getProfileData
  }