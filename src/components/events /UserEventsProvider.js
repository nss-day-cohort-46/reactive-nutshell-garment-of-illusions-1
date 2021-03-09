import React, { createContext, useState } from "react"

export const UserEventsContext = createContext()

export const UserEventsProvider = (props) => {
  const [userEvents, setUserEvents] = useState([])

  const getUserEvents = () => {
    return fetch("http://localhost:8088/userEvents")
    .then(res => res.json())
    .then(setUserEvents)
  }

  return (
    <UserEventsContext.Provider value={{
      userEvents, getUserEvents
    }}>
      {props.children}
    </UserEventsContext.Provider>
  )
}