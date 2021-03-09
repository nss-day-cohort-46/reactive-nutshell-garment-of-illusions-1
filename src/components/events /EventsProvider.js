import React, { createContext, useState } from "react"

export const EventsContext = createContext()

export const EventsProvider = (props) => {
  const [events, setEvents] = useState([])

  const getEvents = () => {
    return fetch("http://localhost:8088/events")
    .then(res => res.json())
    .then(setEvents)
  }

  const getEventById = (id) => {
    return fetch(`http://localhost:8088/events/${id}`)
    .then(res => res.json())
  }

  const updateEvent = (eventObj) => {
    return fetch(`http://localhost:8088/events/${eventObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(eventObj)
    })
    .then(getEvents)
  }

  const saveEvent = (eventObj) => {
    return fetch("http://localhost:8088/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventObj)
    })
    .then(res => res.json())
    .then(eventObj => {
      let userEvent = {
        userId: parseInt(sessionStorage.nutshell_user),
        eventId: eventObj.id,
        creator: true
      }
      return userEvent
    })
    .then(userEventObj => {
      return fetch("http://localhost:8088/userEvents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userEventObj)
      })
    })
    .then(getEvents)
  }

  return (
    <EventsContext.Provider value={{
      events, getEvents, saveEvent, getEventById, updateEvent
    }}>
      {props.children}
    </EventsContext.Provider>
  )
}