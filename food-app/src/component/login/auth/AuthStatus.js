import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import CartContext from "../../../store/context/cart-context";

import classes from "./authStatus.module.scss";

function AuthStatus() {
  const cartCtx = useContext(CartContext);
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    return <p>Welcome to page, please login</p>;
  }

  return (
    <div className={classes.status}>
      Welcome {auth.user}!
      <button
        className={classes.btn}
        onClick={() => {
          auth.signout(() => navigate("/"));
          cartCtx.clearCart();
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default AuthStatus;
