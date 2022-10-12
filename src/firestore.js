import {
    doc,
    setDoc,
    getDoc
  } from 'firebase/firestore';
  import { firestoreDB, storage } from './firebase';
  import { ref, uploadBytes } from 'firebase/storage';

  const addProfileData = async (uid, name, colour, hasAvatar) => {
    const newProfileRef = doc(firestoreDB, 'profiles', uid);
  
    return await setDoc(newProfileRef, { name, colour, hasAvatar });
  };

  const getProfileData = async (uid) => {
    const profileRef = doc(firestoreDB, 'profiles', uid);
    const profileSnapshot = await getDoc(profileRef);

    return profileSnapshot.data();
  }

  const uploadImage = (uid, file) => {
    const storageRef = ref(storage, uid)
    return uploadBytes(storageRef, file);
  }

  export {
    addProfileData,
    getProfileData,
    uploadImage
  }