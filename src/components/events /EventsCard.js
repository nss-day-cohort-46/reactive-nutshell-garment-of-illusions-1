import React, { useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { UserEventsContext } from "./UserEventsProvider"

export const EventsCard = (props) => {
  const {userEvents, getUserEvents} = useContext(UserEventsContext)

  const history = useHistory()

  useEffect(() => {
    getUserEvents()
  }, [])

  const showEditButton = (eventObj) => {
    const currentEvent = userEvents.find(event => event.eventId === eventObj.id)
    if (currentEvent !== undefined){
      if (currentEvent.userId === parseInt(sessionStorage.nutshell_user) && currentEvent.creator === true){
        return <button className="event__editButton" onClick={() => {history.push(`/events/edit/${currentEvent.id}`)}}>Edit Event</button>
      }
    }
  }

  return (
    <>
    <div className="event">
      <div className="event__name">Event Name: {props.event.name}</div>
      <div className="event__location">Location: {props.event.location}</div>
      <div className="event__date">Date: {props.event.date}</div>
      {
        showEditButton(props.event)
      }
    </div>
    </>
  )
}