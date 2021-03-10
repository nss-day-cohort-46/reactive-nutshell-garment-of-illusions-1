import { createContext } from "react";
import { weatherKey } from "../Settings";

export const WeatherContext = createContext()

export const WeatherProvider = (props) => {
    const getTodaysWeather = () => {
        return fetch(`api.openweathermap.org/data/2.5/weather?q=Nashville&appid=8f01d52d478e3ec2c957316c7958823d`)
        .then(res => res.json())
    }
    return (
        <WeatherContext.Provider value={{getTodaysWeather}}>
            {props.children}
        </WeatherContext.Provider>
    
    )
}