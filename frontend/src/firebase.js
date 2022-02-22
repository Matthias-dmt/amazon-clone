import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABNizQjdoacZ5kqZEO5Z8o-BC-Mp6IShg",
  authDomain: "clone-4389f.firebaseapp.com",
  projectId: "clone-4389f",
  storageBucket: "clone-4389f.appspot.com",
  messagingSenderId: "610993047862",
  appId: "1:610993047862:web:cb32d3b4041fe2c8b08b97",
  measurementId: "G-GEGDVYMRKS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
