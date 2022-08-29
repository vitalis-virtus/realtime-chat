import { AppBar, Toolbar, Grid } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";
import { signOut } from "firebase/auth";

function Navbar() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <AppBar color={"primary"} position="static">
      <Toolbar>
        <Grid container justify={"flex-start"}>
          {user ? (
            <button onClick={() => signOut(auth)}>Logout</button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <button>Login</button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
