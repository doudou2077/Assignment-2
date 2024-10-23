import React, { createContext, useState, useContext } from 'react';
import { colors } from '../helperFile/sharedStyles';

// Creating a context for theme management
const ThemeContext = createContext();

// Provider component to wrap around parts of the app that need access to the theme context
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to toggle between light and dark mode
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const theme = {
        backgroundColor: isDarkMode ? colors.darkMode : colors.background,
        textColor: isDarkMode ? colors.white : colors.text,
    };

    return (
        // Provide the theme context values to child components
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);