import React, { useContext, useState, useRef } from "react";
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

function Chat() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);

  const formRef = useRef(null);

  const messagesRef = collection(firestore, "messages");

  const searchQuery = query(messagesRef, orderBy("createdAt"));

  const [messages, loading] = useCollectionData(searchQuery);

  const [value, setValue] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();

    if (value.trim().length) {
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

  const onEnterPress = (event) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      sendMessage(event);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={`chat ${messages ? "" : "chat_no-messages"}`}>
      {messages ? (
        <div className="chat__messages">
          {messages.map(({ createdAt, uid, photoURL, displayName, text }) => (
            <div
              key={createdAt}
              className={`chat__message ${
                uid === user.uid ? "message__right" : "message__left"
              }`}
            >
              <div className="message__bio">
                <img className="message__img" src={photoURL} alt="avatar" />
                <p className="message__diplayName">{displayName}</p>
              </div>
              <p
                className={`message__text ${
                  uid === user.uid
                    ? "message__text_right"
                    : "message__text_left"
                }`}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="chat__welcome">
          <p>Welcome to realtime chat</p>
          <p>No messages yet...</p>
          <p></p>
        </div>
      )}

      <form
        onSubmit={(event) => {
          sendMessage(event);
        }}
        ref={formRef}
        className="chat__form"
      >
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          required={true}
          onKeyDown={(event) => onEnterPress(event)}
          type="text"
          className="chat__form_input"
        />

        <button
          type="submit"
          onClick={(event) => {
            sendMessage(event);
          }}
          className="chat__form_button"
        >
          <div className="arrow"></div>
        </button>
      </form>
    </div>
  );
}

export default Chat;
