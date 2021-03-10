import React, { useContext, useState, useEffect } from "react"
import { UsersContext } from "../users/UsersProvider"
import { FriendsContext } from "./FriendsProvider"
import { FriendsCard } from "./FriendsCard"

export const FriendsSearch = () => {
  const {friends, getFriends} = useContext(FriendsContext)
  const {users, getUsers, setSearchTerms, searchTerms} = useContext(UsersContext)

  const [filteredUsers, setFilteredUsers] = useState([])
  
  useEffect(() => {
    getUsers()
    .then(getFriends)
  }, [])

  useEffect(() => {
    if (searchTerms !== ""){
      let subset = users.filter(user => user.name.includes(searchTerms) && user.id !== parseInt(sessionStorage.nutshell_user))
      subset = subset.filter(user => {
        if (friends.find(friend => friend.currentUserId === parseInt(sessionStorage.nutshell_user) && friend.userId === user.id) === undefined){
          return user
        }
      })
      setFilteredUsers(subset)
    } else {
      setFilteredUsers([])
    }
  }, [searchTerms, users])

  return (
    <>
      <h2 className="friends__title">Search Users</h2>
      <input type="text" className="friends__searchBar" placeholder="Friend's name..." autoFocus onKeyUp={(event) => setSearchTerms(event.target.value)} />
      <div className="friends">
        {
          filteredUsers.map(user => {
            return <FriendsCard key={user.id} friend={user} />
          })
        }
      </div>

    </>
  )
}