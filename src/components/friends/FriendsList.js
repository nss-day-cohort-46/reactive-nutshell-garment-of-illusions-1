import React, { useContext, useEffect, useState } from "react"
import { UsersContext } from "../users/UsersProvider"
import { FriendsCard } from "./FriendsCard"
import { FriendsContext } from "./FriendsProvider"
import "./Friends.css"
import { Link } from "react-router-dom"

export const FriendsList = () => {
  const {friends, getFriends} = useContext(FriendsContext)
  const {users, getUsers} = useContext(UsersContext)

  useEffect(() => {
    getUsers()
    .then(getFriends)
  }, [])

  const filteredFriends = friends.filter(friend => friend.currentUserId === parseInt(sessionStorage.nutshell_user))
  const matchingFriends = filteredFriends.map(friend => users.find(user => user.id === friend.userId))

  return (
    <>
    <h2>Friends List</h2>
    <Link to="/friends/search">
    <button className="friends__searchBtn" >Add a Friend</button>
    </Link>
    <div className="friends">
      {
      matchingFriends.map(friend => {
        return <FriendsCard key={friend.id} friend={friend} />
      })
      }
    </div>
    </>
  )
}