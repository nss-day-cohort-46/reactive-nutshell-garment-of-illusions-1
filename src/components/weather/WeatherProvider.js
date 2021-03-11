import { createContext } from "react";
import { weatherKey } from "../Settings";

export const WeatherContext = createContext()

export const WeatherProvider = (props) => {
    const getTodaysWeather = () => {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=Nashville&appid=${weatherKey}`)
        .then(res => res.json())
    }
    return (
        <WeatherContext.Provider value={{getTodaysWeather}}>
            {props.children}
        </WeatherContext.Provider>
    
    )
}