import { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] =useState(null);

    useEffect(() =>{
        const token = localStorage.getItem('token');
        if(token){
            const decodedToken = jwt_decode(token);
            setUser(decodedToken);
        }
    },[]);

    return (
        <UserContext.Provider value ={{ user }} >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);