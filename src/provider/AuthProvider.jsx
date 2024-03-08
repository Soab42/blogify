import { useEffect, useState } from "react";
import { AuthContext } from "../context";
import useSessionCookie from "../hooks/useSessionCookie";

const AuthProvider = ({ children }) => {
  // Retrieve functions for managing session cookies
  const { getCookie, setCookie } = useSessionCookie();
  // removeCookie("auth");
  // Retrieve initial authentication data from the session cookie
  const initialAuth = getCookie("auth");

  // Initialize state for authentication data
  const [auth, setAuth] = useState(initialAuth ? JSON.parse(initialAuth) : {});

  useEffect(() => {
    if (auth) {
      setCookie("auth", JSON.stringify(auth));
    }
  }, [auth]);

  // Provide authentication context to the entire component tree
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
