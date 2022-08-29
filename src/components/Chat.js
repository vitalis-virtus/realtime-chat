import React, { useContext, useState } from "react";
import Loader from "./Loader";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  serverTimestamp,
  collection,
  addDoc,
  orderBy,
  getDocs,
  query,
} from "firebase/firestore";

function Chat() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);

  const messagesRef = collection(firestore, "messages");

  const searchQuery = query(messagesRef, orderBy("createdAt"));

  const [messages, loading] = useCollectionData(searchQuery);

  const [value, setValue] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    await addDoc(collection(firestore, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: serverTimestamp(),
    });

    setValue("");
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.createdAt}>
            <img src={message.photoURL} alt="avatar" />
            <p>{message.displayName}</p>
            <div>{message.text}</div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          sendMessage(event);
        }}
      >
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          type="text"
        />

        <button
          type="submit"
          onClick={(event) => {
            sendMessage(event);
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
