import { createContext, useState } from "react";

var LoaderContext = createContext();

const LoaderState = (props) => {

    const [progress, setProgress] = useState(0);

    return (
        <LoaderContext.Provider value={{ progress, setProgress }}>
            {props.children}
        </LoaderContext.Provider>
    )
}

export var LoaderContext;

export default LoaderState