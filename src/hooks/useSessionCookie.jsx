import { useState, useEffect } from "react";

function useSessionCookie(key, initialValue = null) {
  // Get the initial value from session cookie if available, otherwise use initialValue
  console.log(key);
  const [storedValue, setStoredValue] = useState(null);
  console.log(storedValue);
  // Update session cookie whenever the storedValue changes
  useEffect(() => {
    const cookieValue = getCookie(key);
    // return cookieValue !== "" ? JSON.parse(cookieValue) : initialValue;
    try {
      if (storedValue === null) {
        console.log("cockie is reset");
        removeCookie(key);
      } else {
        setCookie(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  // Helper function to get cookie value
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
  }

  // Helper function to set cookie value
  function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`;
  }

  // Helper function to remove cookie
  function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  return [storedValue, setStoredValue];
}

export default useSessionCookie;
