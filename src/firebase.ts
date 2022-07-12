import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyByytgDaQLHeGM6Z30GSgRQSgHXkbnRia0",
    authDomain: "converge-poap.firebaseapp.com",
    projectId: "converge-poap",
    storageBucket: "converge-poap.appspot.com",
    messagingSenderId: "583705806977",
    appId: "1:583705806977:web:d5f5b85b19385e41e1a580"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    app,
    db,
}