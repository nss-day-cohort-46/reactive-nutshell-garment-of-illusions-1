import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { EventsCard } from "./EventsCard"
import { EventsContext } from "./EventsProvider"

export const EventsList = () => {
  const {events, getEvents} = useContext(EventsContext)

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
    <Link to="/events/create">
    <button className="btn--addEvent">Add Event</button>
    </Link>
    <div className="events">
      {
        events.map(event => {
          return <EventsCard key={event.id} event={event} />
        })
      }
    </div>
    </>
  )
}