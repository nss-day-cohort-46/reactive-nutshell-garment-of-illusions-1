import React, { useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"

export const EventsCard = (props) => {
  const history = useHistory()
  const userId = parseInt(sessionStorage.nutshell_user)

  const showEditButton = (eventObj) => {
    if (eventObj.userId === userId && eventObj.creator === true){
      return <button className="event__editButton" onClick={() => {history.push(`/events/edit/${eventObj.id}`)}}>Edit Event</button>
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
    </div>
    </>
  )
}