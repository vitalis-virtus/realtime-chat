import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import App from "./App";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const { REACT_APP_API_KEY_FIREBASE, REACT_APP_ID_FIREBASE } = process.env;

export const Context = createContext(null);

const app = firebase.initializeApp({
  apiKey: REACT_APP_API_KEY_FIREBASE,
  authDomain: "realtime-chat-226eb.firebaseapp.com",
  projectId: "realtime-chat-226eb",
  storageBucket: "realtime-chat-226eb.appspot.com",
  messagingSenderId: "333713813440",
  appId: REACT_APP_ID_FIREBASE,
  measurementId: "G-B1X4FYWS45",
});

const firestore = getFirestore(app);
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ app, firestore, auth }}>
    <App />
  </Context.Provider>
);
