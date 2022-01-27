import  {initializeApp}  from "firebase/app";
import {getFirestore} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCfAHhRFg0KnTtjgkr3n2zGhkVb8JNYEag",
  authDomain: "tksadaqah.firebaseapp.com",
  databaseURL: "https://tksadaqah-default-rtdb.firebaseio.com",
  projectId: "tksadaqah",
  storageBucket: "tksadaqah.appspot.com",
  messagingSenderId: "839242192963",
  appId: "1:839242192963:web:b32dee29206ed6a4541cf6"
};

const app =initializeApp(firebaseConfig);

export const appFirebaseConfig =getFirestore(app);