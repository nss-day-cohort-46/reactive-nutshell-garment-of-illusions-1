import React, { useContext, useEffect, useState } from "react"
import { UsersContext } from "../users/UsersProvider"
import { FriendsCard } from "./FriendsCard"
import { FriendsContext } from "./FriendsProvider"
import "./Friends.css"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"

export const FriendsList = () => {
  const {friends, getFriends} = useContext(FriendsContext)
  const {users, getUsers, setSearchTerms} = useContext(UsersContext)

  useEffect(() => {
    getUsers()
    .then(getFriends)
    .then(setSearchTerms(""))
  }, [])

  const filteredFriends = friends.filter(friend => friend.currentUserId === parseInt(sessionStorage.nutshell_user))
  const matchingFriends = filteredFriends.map(friend => users.find(user => user.id === friend.userId))

  return (
    <>
    <h2 className="friends__title">Friends List</h2>
    <Link to="/friends/search">
    <Button variant="primary" className="friends__searchBtn friends__btn" >Add Friend</Button>
    </Link>
    <div className="friends">
      <Accordion defaultActiveKey="0">
      {
      matchingFriends.map(friend => {
        return <FriendsCard key={friend.id} friend={friend} />
      })
      }
      </Accordion>
    </div>
    </>
  )
}