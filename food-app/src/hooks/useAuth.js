import React from "react";
import AuthContext from "../store/auth-context";

function useAuth() {
  return React.useContext(AuthContext);
}

export default useAuth;
