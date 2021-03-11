import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { EventsContext } from "./EventsProvider"

export const EventsForm = () => {
  const {saveEvent, getEvents, getEventById, updateEvent} = useContext(EventsContext)

  const {eventId} = useParams()
  const history = useHistory()

  const [newEvent, setEvent] = useState({
    name: "",
    location: "",
    date: ""
  })

  useEffect(() => {
    getEvents()
    .then(() => {
      if (eventId){
        getEventById(eventId)
        .then(event => {
          setEvent(event)
        })
      }
    })
  }, [])

  const handleInputChange = (event) => {
    const eventObj = {...newEvent}

    eventObj[event.target.id] = event.target.value

    setEvent(eventObj)
  }

  const handleSaveEvent = (event) => {
    if (eventId){
      updateEvent({
        name: newEvent.name,
        location: newEvent.location,
        date: newEvent.date,
        id: newEvent.id
      })
      .then(history.push("/events"))
    } else {
      saveEvent(newEvent)
      .then(history.push("/events"))
    }
  }

  return (
    <>
    <h2 className="eventForm__title">New Event</h2>
    <form className="eventForm">
      <fieldset className="form-group">
        <div>
          <label htmlFor="eventName">Event Name: </label>
          <input type="text" id="name" required className="form-control" autoFocus placeholder="Event Name..." onChange={handleInputChange} value={newEvent.name} />
        </div>
      </fieldset>
      <fieldset className="form-group">
        <div>
          <label htmlFor="eventLocation">Location: </label>
          <input type="text" id="location" required className="form-control" placeholder="Event Location..." onChange={handleInputChange} value={newEvent.location} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <input type="date" id="date" onChange={handleInputChange} required className="form-control" placeholder="Event Date..." value={newEvent.date} />
        </div>
      </fieldset>
      <button className="event__btn event__saveBtn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleSaveEvent()
          }}>
        {eventId ? "Edit Event" : "Save Event"}</button>
    </form>
    </>
  )
}