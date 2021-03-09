import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { EventsContext } from "./EventsProvider"

export const EventsForm = () => {
  const {saveEvent} = useContext(EventsContext)

  const history = useHistory()

  const [newEvent, setEvent] = useState({
    name: "",
    location: "",
    date: ""
  })

  const handleInputChange = (event) => {
    const eventObj = {...newEvent}

    eventObj[event.target.id] = event.target.value

    setEvent(eventObj)
  }

  const handleSaveEvent = (event) => {
    saveEvent(newEvent)
    .then(history.push("/events"))
  }

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">New Event</h2>
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
      <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleSaveEvent()
          }}>
        Save Event</button>
    </form>
  )
}