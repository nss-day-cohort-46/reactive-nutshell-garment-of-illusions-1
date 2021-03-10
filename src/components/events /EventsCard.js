import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { WeatherContext } from "../weather/WeatherProvider"

export const EventsCard = (props) => {
  const history = useHistory()
  const {getTodaysWeather, getEventWeather} = useContext(WeatherContext)
  const [gotWeather, setGotWeather] = useState(false)
  const [weather, setWeather] = useState({
    description: "",
    temp: 0,
    humidity: 0,
    wind: 0
})
  const userId = parseInt(sessionStorage.nutshell_user)

  const showEditButton = (eventObj) => {
    if (eventObj.userId === userId && eventObj.creator === true){
      return <button className="event__editButton" onClick={() => {history.push(`/events/edit/${eventObj.id}`)}}>Edit Event</button>
    }
  }

  const getWeather = (event) => {
    event.preventDefault()
    const date = new Date(props.event.date)
    const todaysDate = new Date()
    const daysAway = Math.ceil((date - todaysDate) / (1000 * 60 * 60 * 24))
    if(daysAway > 0){
      if (daysAway < 7){
        getEventWeather(daysAway).then(weather => {
          const tempWeather = {
            description: weather.weather[0].description,
            temp: (((weather.temp.day - 273.15) * (9/5)) + 32).toFixed(2),
            humidity: weather.humidity,
            wind: weather.wind_speed
          }
          setWeather(tempWeather)
          setGotWeather(true)
        })
      }else{
        getTodaysWeather().then((weather)=> {
        const tempWeather = {
            description: weather.weather[0].description,
            temp: (((weather.main.temp - 273.15) * (9/5)) + 32).toFixed(2),
            humidity: weather.main.humidity,
            wind: weather.wind.speed
        }
        setWeather(tempWeather)
        setGotWeather(false)
    })
    }
    }else{
      alert("Event already Happened")
    }
    
  }

  return (
    <>
    <div className="event" style={props.event.userId === userId ? {} : {background: "cornsilk"}}>
      <div className="event__name">{props.event.userId === userId ? `Event Name: ${props.event.name}` : <i>Event Name: {props.event.name}</i>}</div>
      <div className="event__location">{props.event.userId === userId ? `Location: ${props.event.location}` : <i>Location: {props.event.location}</i>}</div>
      <div className="event__date">{props.event.userId === userId ? `Date: ${props.event.date}` : <i>Date: {props.event.date}</i>}</div>
      {
        showEditButton(props.event)
      }
      <button className="weatherButton" onClick={getWeather} value={props.event.date}>show weather</button>
    </div>
    {weather.description ? <div className="weather">
                    <h2>{gotWeather ? props.event.date : "Todays Weather"}</h2>
                    <div className="weather_description">{weather.description}</div>
                    <div className="weather_temp">{weather.temp} degrees</div>
                    <div className="weather_humidity">humidity: {weather.humidity}</div>
                    <div className="weather_wind">wind speed: {weather.wind} mph</div>
                </div>
                : <></>}
    </>
  )
}