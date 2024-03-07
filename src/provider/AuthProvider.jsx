import { useEffect, useState } from "react";

import { AuthContext } from "../context";
import useSessionCookie from "../hooks/useSessionCookie";
// import  from "../hooks/useSessionCookie";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [storedValue, setStoredValue] = useSessionCookie("auth");

  useEffect(() => {
    if (storedValue?.user) {
      setAuth(storedValue);
    }
  }, []);

  useEffect(() => {
    if (auth?.user) {
      setStoredValue(auth);
    }
  }, [auth, setStoredValue]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
