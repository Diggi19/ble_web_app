import React from "react"

export const drawerContext = React.createContext()

export const drawerProvider = ({children})=>{
    const susan = "suan"
    const tommy = "tommy"
    return(
        <drawerContext.Provider value={{
            susan,
            tommy
        }}>
            {children}
        </drawerContext.Provider>
    )
}
