import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";
import { signOut } from "firebase/auth";

import "../styles/components/Navbar.scss";

function Navbar() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <div className="navbar">
      <span className="navbar__logo">Realtime Chat</span>
      {user ? (
        <button
          className="navbar__button button__logout"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      ) : (
        <NavLink to={LOGIN_ROUTE}>
          <button className="navbar__button button__login">Login</button>
        </NavLink>
      )}
    </div>
  );
}

export default Navbar;
