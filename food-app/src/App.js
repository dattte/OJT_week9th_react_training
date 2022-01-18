import React from "react";
import { Link, useLocation, Navigate, Routes, Route } from "react-router-dom";

import user from "./assets/user";

import AuthProvider from "./store/AuthProvider";
import CartProvider from "./store/CardProvider";
import Register from "./component/register/Register";
import Menu from "./component/menu/Menu";
import useAuth from "./hooks/useAuth";
import AuthStatus from "./component/login/AuthStatus";
import Login from "./component/login/Login";

import classes from "./App.module.scss";
import { useState } from "react/cjs/react.development";

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const [loginUser, setLoginUser] = useState(null);

  const loginHandler = (data) => {
    setLoginUser(data);
  };

  const registerHandler = (data) => {
    user.push({ ...data, id: Math.floor(Math.random() * 100) });
  };

  return (
    <CartProvider>
      <AuthProvider>
        <div className={classes.App}>
          <ul className={classes["App-nav"]}>
            <li>
              <AuthStatus></AuthStatus>
            </li>

            <li>
              <Link to="/#">
                <img src="images/Logo-full-black.png" alt="logo" />
              </Link>
            </li>

            <li>
              <Link to="/">
                <img src="images/basket2.png" alt="cart" />
              </Link>
            </li>
          </ul>

          <Routes>
            <Route
              path="/register"
              element={<Register onConfirm={registerHandler} />}
            />
            <Route path="/login" element={<Login onConfirm={loginHandler} />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Menu loginUser={loginUser} />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
