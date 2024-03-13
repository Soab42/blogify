import { useEffect, useState } from "react";
import { ThemeContext } from "../context";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (userTheme) {
      setTheme(userTheme);
    } else if (systemTheme) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement; // Select the HTML element
    // console.log(html);

    if (theme === "dark") {
      localStorage.setItem("theme", theme);
      html.classList.add("dark"); // Add the "dark" class
      // console.log("dark");
    } else {
      localStorage.setItem("theme", "dark");
      html.classList.remove("dark"); // Remove the "dark" class
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
