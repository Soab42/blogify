import { useEffect, useState } from "react";
import { AuthContext } from "../context";
import useSessionCookie from "../hooks/useSessionCookie";

const AuthProvider = ({ children }) => {
  const { getCookie, setCookie } = useSessionCookie();

  const initialAuth = getCookie("auth");

  // Initialize state for authentication data
  const [auth, setAuth] = useState(initialAuth ? JSON.parse(initialAuth) : {});

  useEffect(() => {
    if (auth) {
      setCookie("auth", JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
