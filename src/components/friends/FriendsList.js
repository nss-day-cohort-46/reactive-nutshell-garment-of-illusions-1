import React, { useContext, useEffect, useState } from "react"
import { UsersContext } from "../users/UsersProvider"
import { FriendsCard } from "./FriendsCard"
import { FriendsContext } from "./FriendsProvider"
import "./Friends.css"

export const FriendsList = () => {
  const {friends, getFriends} = useContext(FriendsContext)
  const {users, getUsers, searchTerms} = useContext(UsersContext)

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
      console.log(subset)
      setFilteredUsers(subset)
    }
  }, [searchTerms, users])

  const filteredFriends = friends.filter(friend => friend.currentUserId === parseInt(sessionStorage.nutshell_user))
  const matchingFriends = filteredFriends.map(friend => users.find(user => user.id === friend.userId))

  if (searchTerms!== ""){
    return (
      <div className="friends">
        <h2>Search Users</h2>
        {
          filteredUsers.map(user => {
            return <FriendsCard key={user.id} friend={user} />
          })
        }
      </div>
    )
  } else {
    return (
      <div className="friends">
        <h2>Friends List</h2>
        {
        matchingFriends.map(friend => {
          return <FriendsCard key={friend.id} friend={friend} />
        })
        }
      </div>
    )
  }
}