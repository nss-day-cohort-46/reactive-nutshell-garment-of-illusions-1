import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { EventsCard } from "./EventsCard"
import { EventsContext } from "./EventsProvider"
import "./Events.css"
import { FriendsContext } from "../friends/FriendsProvider"
import { UserEventsContext } from "./UserEventsProvider"

export const EventsList = () => {
  const {events, getEvents} = useContext(EventsContext)
  const {friends, getFriends} = useContext(FriendsContext)
  const {userEvents, getUserEvents} = useContext(UserEventsContext)

  const userId = parseInt(sessionStorage.nutshell_user)

  useEffect(() => {
    getFriends()
    .then(getEvents)
    .then(getUserEvents)
  }, [])

  const filteredFriends = friends.filter(friend => friend.currentUserId === userId)
  let filteredEvents = filteredFriends.map(friend => {
    return userEvents.filter(ue => ue.userId === friend.userId)
  })
  filteredEvents.push(userEvents.filter(ue => ue.userId === userId))
  filteredEvents = filteredEvents.flat().map(ue => {
    const matchingEvent = events.find(event => event.id === ue.eventId)
    matchingEvent.userId = ue.userId
    matchingEvent.creator = ue.creator
    return matchingEvent
  })

  if (filteredEvents.includes(undefined) === false){
    return (
      <>
      <h2 className="events__title">Events</h2>
      <Link to="/events/create">
      <button className="btn--addEvent event__btn">Add Event</button>
      </Link>
      <div className="events">
        {
          filteredEvents.map(event => {
            return <EventsCard key={event.id} event={event} />
          })
        }
      </div>
      </>
    )
  } else {
    return <></>
  }
}