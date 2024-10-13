import React, { createContext, useState, useContext } from 'react';

// Create a context for managing diet and activity entries
const CombinedContext = createContext();

export const CombinedProvider = ({ children }) => {
    // State to hold diet entries
    const [dietEntries, setDietEntries] = useState([]);
    // State to hold activity entries
    const [activities, setActivities] = useState([]);

    // Function to add a new diet entry
    const addDietEntry = (entry) => {
        setDietEntries(prevEntries => [...prevEntries, entry]);
    };

    // Function to add a new activity
    const addActivity = (activity) => {
        setActivities(prevActivities => [...prevActivities, activity]);
    };

    return (
        <CombinedContext.Provider value={{ dietEntries, addDietEntry, activities, addActivity }}>
            {children}
        </CombinedContext.Provider>
    );
};

// Custom hook to use the CombinedContext
export const useCombinedContext = () => useContext(CombinedContext);