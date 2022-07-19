import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyBYaNewiUZqmqzIT9j_9GPSKHfGaN9aTWg",
  authDomain: "eldnevniktues.firebaseapp.com",
  projectId: "eldnevniktues",
  storageBucket: "eldnevniktues.appspot.com",
  messagingSenderId: "71692314155",
  appId: "1:71692314155:web:49287c5b2954f15680ac6e",
  measurementId: "G-5KH8EVV6ZZ",
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
