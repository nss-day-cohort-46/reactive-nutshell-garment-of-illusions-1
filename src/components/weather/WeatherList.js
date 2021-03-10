import { useContext, useEffect } from "react"
import { WeatherContext } from "./WeatherProvider"

export const WeatherList = () => {
    
    const {getTodaysWeather} = useContext(WeatherContext)

    useEffect(()=>{
        getTodaysWeather().then((weather)=> console.log(weather))
    },[])

    return <></>
}