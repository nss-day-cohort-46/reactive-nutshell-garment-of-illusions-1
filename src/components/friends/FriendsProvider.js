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

  const removeFriends = (id) => {
    return fetch(`http://localhost:8088/friends/${id}`, {
      method: "DELETE"
    })
    .then(getFriends)
  }

  return (
    <FriendsContext.Provider value={{
      friends, getFriends, addFriends, removeFriends
    }}>
      {props.children}
    </FriendsContext.Provider>
  )
}