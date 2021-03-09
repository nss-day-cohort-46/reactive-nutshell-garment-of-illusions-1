import React, { createContext, useState } from "react"

export const FriendsContext = createContext()

export const FriendsProvider = (props) => {
  const [friends, setFriends] = useState([])

  const getFriends = () => {
    return fetch("http://localhost:8088/friends")
    .then(res => res.json())
    .then(setFriends)
  }

  const addFriends = (obj) => {
    return fetch("http://localhost:8088/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
    .then(getFriends)
  }

  return (
    <FriendsContext.Provider value={{
      friends, getFriends, addFriends
    }}>
      {props.children}
    </FriendsContext.Provider>
  )
}