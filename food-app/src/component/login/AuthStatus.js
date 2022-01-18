import React from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import classes from "./Login.module.scss";

function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in. PLease login </p>;
  }

  return (
    <div className={classes.status}>
      Welcome {auth.user}!
      <button
        className={classes.btn}
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default AuthStatus;
