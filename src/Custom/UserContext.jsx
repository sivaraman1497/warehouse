import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook to use the context
export const useUser = () => {
    return useContext(UserContext);
};

// Context provider to manage the username
export const UserProvider = ({ children }) => { // UserProvider will be wrapped at the top. All the content wrapped inside are the children
    const [username, setUsername] = useState('');

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};
