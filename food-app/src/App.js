import React, { useState } from "react";
import { useLocation, Navigate, Routes, Route } from "react-router-dom";

import AuthProvider from "./store/AuthProvider";
import CartProvider from "./store/actions/CardProvider";
import Register from "./component/register/Register";
import Menu from "./component/menu/Menu";
import useAuth from "./hooks/useAuth";

import Login from "./component/login/Login";

import classes from "./App.module.scss";

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

  const handleLogin = (data) => {
    setLoginUser(data);
  };

  return (
    <AuthProvider>
      <div className={classes.App}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onConfirm={handleLogin} />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <CartProvider>
                  <Menu loginUser={loginUser} />
                </CartProvider>
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
