import React, { useContext } from "react";
import { Context } from "../index";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);
  };

  return (
    <div className="login">
      <button onClick={login} className="login__button">
        Enter with Google
      </button>
    </div>
  );
}

export default Login;