import {
    doc,
    setDoc,
    getDoc,
    collection,
    getDocs,
    updateDoc,
    deleteDoc
  } from 'firebase/firestore';
  import { firestoreDB, storage } from './firebase';
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Profile from './models/Profile';
import Event from './models/Event';
import {v4 as uuid} from 'uuid';

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
  };

  const updateProfileData = async (uid, name, colour, avatar) => {
    if(avatar) {
      const downloadURL = await uploadAvatar(uid, avatar);
      avatar = downloadURL;
    } else {
      avatar = '/images/defaultavatar.png'
    }
    const profileRef = doc(firestoreDB, 'profiles', uid);
    return await updateDoc(profileRef, {name, colour, avatar})
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

  const getUserColours = async () => {
    const userColours = {};

    const profilesCollection = await getDocs(collection(firestoreDB, 'profiles'));
    
    profilesCollection.forEach((profile) => {
      userColours[profile.id] = profile.data().colour;
    });

    return userColours;
  }

  const addEvent = async (title, start, end, owner) => {
    const eventID = uuid();
    const newEventRef = doc(firestoreDB, 'events', eventID);

    return await setDoc(newEventRef, {title, start, end, owner})
  }

  const updateEvent = async (title, start, end, owner, eventID) => {
    const eventRef = doc(firestoreDB, 'events', eventID);
    return await updateDoc(eventRef, {title, start, end, owner});
  }

  const getEvents = async(uid) => {
    const eventsCollection = await getDocs(collection(firestoreDB, 'events'));
    const userColours = await getUserColours()
    const eventsArray = [];
    
    eventsCollection.forEach((event) => {
      const isEditable = event.data().owner === uid;
      const colour = userColours[event.data().owner]
      const formattedEvent = new Event(event.data().title, event.data().start, event.data().end, colour, event.id, isEditable);
      eventsArray.push(formattedEvent)
    })

    return eventsArray;
  }

  const deleteEvent = async(id) => {
    const eventRef = doc(firestoreDB, 'events', id);

    return await deleteDoc(eventRef);
  }

  export {
    addProfileData,
    updateProfileData,
    createProfileFromUser,
    uploadAvatar,
    getAvatar,
    addEvent,
    getEvents,
    updateEvent,
    deleteEvent
  }