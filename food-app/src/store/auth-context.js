import React from "react";

const AuthContext = React.createContext({
  user: "",
  signin: (user, callback) => {},
  signout: (callback) => {},
});

export default AuthContext;
