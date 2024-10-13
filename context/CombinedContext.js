import React, { createContext, useState, useContext } from 'react';

const CombinedContext = createContext();

export const CombinedProvider = ({ children }) => {
    const [dietEntries, setDietEntries] = useState([]);
    const [activities, setActivities] = useState([]);

    const addDietEntry = (entry) => {
        setDietEntries(prevEntries => [...prevEntries, entry]);
    };

    const addActivity = (activity) => {
        setActivities(prevActivities => [...prevActivities, activity]);
    };

    return (
        <CombinedContext.Provider value={{ dietEntries, addDietEntry, activities, addActivity }}>
            {children}
        </CombinedContext.Provider>
    );
};

export const useCombinedContext = () => useContext(CombinedContext);