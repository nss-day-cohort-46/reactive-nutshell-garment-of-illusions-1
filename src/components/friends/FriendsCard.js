import React, { useContext, useState } from "react"
import { FriendsContext } from "./FriendsProvider"

export const FriendsCard = (props) => {
  const {friends, getFriends} = useContext(FriendsContext)
  
  return (
    <div className="friend">
      <div className="friend__name">{props.friend.name}</div>
    </div>
  )
}