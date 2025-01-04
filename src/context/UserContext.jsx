import { createContext, useContext, useState } from "react";

const UserContext = createContext(null)
const UserContextProvider = ({children}) => {
    let [userId, setUserId] = useState("sdfdsg5er65tfy7iyuj")

    const updatedUserId = (id) => {
        setUserId(id)
    }
    const value = {userId, updatedUserId}

    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
}

const useUserContext = () => {
    let context = useContext(UserContext)
    if(!context){
        throw new Error ("оберните компоненты в UserContextProvider")
    }
    return context
}


export  {UserContextProvider, useUserContext}






