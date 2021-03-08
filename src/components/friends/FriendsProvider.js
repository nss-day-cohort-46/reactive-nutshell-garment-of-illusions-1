import React, { createContext, useState } from "react"

export const FriendsContext = createContext()

export const FriendsProvider = (props) => {
  const [friends, setFriends] = useState([])

  const getFriends = () => {
    return fetch("http://localhost:8088/friends")
    .then(res => res.json())
    .then(setFriends)
  }

  return (
    <FriendsContext.Provider value={{
      friends, getFriends
    }}>
      {props.children}
    </FriendsContext.Provider>
  )
}