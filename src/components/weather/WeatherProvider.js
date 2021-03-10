import { createContext } from "react";
import { weatherKey } from "../Settings";

export const WeatherContext = createContext()

export const WeatherProvider = (props) => {
    const getTodaysWeather = () => {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=Nashville&appid=${weatherKey}`)
        .then(res => res.json())
    }
    const getEventWeather = (dayDiff) => {
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=36.1627&lon=-86.7816&exclude=minutely,hourly,alerts&appid=${weatherKey}`)
        .then(res => res.json())
        .then(weather => weather.daily[dayDiff])
    }
return (
        <WeatherContext.Provider value={{getTodaysWeather, getEventWeather}}>
            {props.children}
        </WeatherContext.Provider>
    
    )
}