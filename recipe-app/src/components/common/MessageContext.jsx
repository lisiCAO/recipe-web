import { createContext, useState, useContext } from "react";
import './MessageContext.scss';

export const MessageContext =  createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({children}) => {
    const [message, setMessage] = useState({type: '', text: ''});

    const showMessage = (type, text, timeout = 3000) => {
        setMessage({ type, text});

        setTimeout(()=>{
            hideMessage();
        }, timeout)
    };

    const hideMessage = () => {
        setMessage({ type: '', text: ''});
    };

    return (
        <MessageContext.Provider value={{message, showMessage, hideMessage}}>
            {children}
        </MessageContext.Provider>
    )
}