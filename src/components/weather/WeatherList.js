import { useContext, useEffect, useState } from "react"
import { WeatherContext } from "./WeatherProvider"

export const WeatherList = () => {
    const [weather, setWeather] = useState({
        description: "",
        temp: 0,
        humidity: 0,
        wind: 0
    })
    const {getTodaysWeather} = useContext(WeatherContext)

    useEffect(()=>{
        getTodaysWeather().then((weather)=> {
            const tempWeather = {
                description: weather.weather[0].description,
                temp: (((weather.main.temp - 273.15) * (9/5)) + 32).toFixed(2),
                humidity: weather.main.humidity,
                wind: weather.wind.speed
            }
            setWeather(tempWeather)
        })
    },[])

    return <>
                <div className="weather">
                    <h2>Todays Weather</h2>
                    <div className="weather_description">{weather.description}</div>
                    <div className="weather_temp">{weather.temp} degrees</div>
                    <div className="weather_humidity">humidity: {weather.humidity}</div>
                    <div className="weather_wind">wind speed: {weather.wind} mph</div>
                </div>
            </>
}