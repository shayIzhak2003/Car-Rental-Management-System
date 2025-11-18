import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser, updateTheme } from "./services/Api";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); // boolean

  // Load user's saved theme from backend
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const user = await getCurrentUser();

        // backend returns: { ..., darkMode: true/false }
        const savedMode = user?.darkMode ?? false;

        setDarkMode(savedMode);
        document.documentElement.classList.toggle("dark", savedMode);
      } catch (err) {
        console.error("Could not load theme:", err);
      }
    };

    loadTheme();
  }, []);

  // Toggle + save to backend
  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    // Apply immediately to DOM
    document.documentElement.classList.toggle("dark", newMode);

    try {
      await updateTheme(newMode); // saves boolean to backend
    } catch (err) {
      console.error("Theme update failed:", err);
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
