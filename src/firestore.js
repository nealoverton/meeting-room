import {
    doc,
    setDoc,
    getDoc
  } from 'firebase/firestore';
  import { firestoreDB, storage } from './firebase';
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Profile from './models/Profile';

  const addProfileData = async (uid, name, colour, avatar) => {
    if(avatar) {
      const downloadURL = await uploadAvatar(uid, avatar);
      avatar = downloadURL;
    } else {
      avatar = '/images/defaultavatar.png'
    }
    const newProfileRef = doc(firestoreDB, 'profiles', uid);
  
    return await setDoc(newProfileRef, { name, colour, avatar });
  };

  const getProfileData = async (uid) => {
    const profileRef = doc(firestoreDB, 'profiles', uid);
    const profileSnapshot = await getDoc(profileRef);

    return profileSnapshot.data();
  }

  const createProfileFromUser = async ({uid, email}) => {
    const {name, colour, avatar} = await getProfileData(uid);
    
    const newProfile = new Profile(uid, email, name, colour, avatar);

    return newProfile;
  }

  const uploadAvatar = async (uid, file) => {
    const storageRef = ref(storage, uid)
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  const getAvatar = async (uid) => {
    const storageRef = ref(storage, uid)
    const avatarSnapshot = await getDoc(storageRef);

    return avatarSnapshot.data();
  }

  export {
    addProfileData,
    createProfileFromUser,
    uploadAvatar,
    getAvatar
  }