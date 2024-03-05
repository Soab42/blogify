import { useState, useEffect } from "react";

function useSessionCookie(key, initialValue = null) {
  // Get the initial value from session cookie if available, otherwise use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const cookieValue = getCookie(key);
      return cookieValue !== "" ? JSON.parse(cookieValue) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update session cookie whenever the storedValue changes
  useEffect(() => {
    try {
      setCookie(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

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

export default useSessionCookie;
