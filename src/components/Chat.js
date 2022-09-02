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
  query,
} from "firebase/firestore";

import "../styles/components/Chat.scss";

function Chat() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);

  const messagesRef = collection(firestore, "messages");

  const searchQuery = query(messagesRef, orderBy("createdAt"));

  const [messages, loading] = useCollectionData(searchQuery);

  const [value, setValue] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (value) {
      await addDoc(collection(firestore, "messages"), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: serverTimestamp(),
      });

      setValue("");
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="chat">
      <div className="chat__messages">
        {messages.map((message) => (
          <div
            key={message.createdAt}
            className={`chat__message ${
              message.uid === user.uid ? "message__right" : "message__left"
            }`}
          >
            <div className="message__bio">
              <img
                className="message__img"
                src={message.photoURL}
                alt="avatar"
              />
              <p className="message__diplayName">{message.displayName}</p>
            </div>
            <p
              className={`message__text ${
                message.uid === user.uid
                  ? "message__text_right"
                  : "message__text_left"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          sendMessage(event);
        }}
        className="chat__form"
      >
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          type="text"
          className="chat__from_input"
        />

        <button
          type="submit"
          onClick={(event) => {
            sendMessage(event);
          }}
          className="chat__from_button"
        >
          <div className="arrow"></div>
        </button>
      </form>
    </div>
  );
}

export default Chat;
