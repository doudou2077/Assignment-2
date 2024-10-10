import React, { createContext, useState, useContext } from 'react';

const DietContext = createContext();

export const DietProvider = ({ children }) => {
    const [dietEntries, setDietEntries] = useState([]);

    const addDietEntry = (entry) => {
        setDietEntries(prevEntries => [...prevEntries, entry]);
    };

    return (
        <DietContext.Provider value={{ dietEntries, addDietEntry }}>
            {children}
        </DietContext.Provider>
    );
};

export const useDietContext = () => useContext(DietContext);