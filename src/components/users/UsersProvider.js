import React, { createContext, useState } from "react"

export const UsersContext = createContext()

export const UsersProvider = (props) => {
  const [users, setUsers] = useState([])
  const [ searchTerms, setSearchTerms ] = useState("")

  const getUsers = () => {
    return fetch("http://localhost:8088/users")
    .then(res => res.json())
    .then(setUsers)
  }

  return (
    <UsersContext.Provider value={{
      users, getUsers, searchTerms, setSearchTerms
    }}>
      {props.children}
    </UsersContext.Provider>
  )
}