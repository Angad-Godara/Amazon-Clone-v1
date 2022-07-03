import { createContext, useContext, useReducer } from "react"
import reducer, { initialState } from "./Reducers/reducer"

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)
// now this will return a [state, dispatch]