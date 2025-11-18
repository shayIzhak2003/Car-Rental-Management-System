import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser, updateTheme } from "../services/Api";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme to DOM explicitly
  const applyTheme = (mode) => {
    if (mode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Load theme from localStorage first, then backend
  useEffect(() => {
    const localMode = localStorage.getItem("darkMode");

    // Apply localStorage theme if exists
    if (localMode !== null) {
      const boolMode = localMode === "true";
      setDarkMode(boolMode);
      applyTheme(boolMode);
    }

    // Then sync with backend
    const loadBackendTheme = async () => {
      try {
        const user = await getCurrentUser();
        // backend returns DarkMode (uppercase) in your code
        const savedMode = user?.DarkMode ?? false;

        // Only update if backend differs from current state
        if (savedMode !== darkMode) {
          setDarkMode(savedMode);
          applyTheme(savedMode);
          localStorage.setItem("darkMode", savedMode);
        }
      } catch (err) {
        console.error("Could not load theme from backend:", err);
      }
    };

    loadBackendTheme();
  }, []); // run once

  // Toggle theme
  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    applyTheme(newMode);
    localStorage.setItem("darkMode", newMode);

    try {
      await updateTheme(newMode);
    } catch (err) {
      console.error("Failed to update theme on backend:", err);
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
