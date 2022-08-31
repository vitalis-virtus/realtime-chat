import React, { useContext } from "react";
import { Context } from "../index";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import "../styles/normalize.scss";
import "../styles/utils/variables.scss";
import "../styles/components/Login.scss";

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
        <p> Enter with Google</p>
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
          alt="google-logo"
        />
      </button>
    </div>
  );
}

export default Login;
