import React, { useContext } from "react"
import { UsersContext } from "../users/UsersProvider"
import { FriendsContext } from "./FriendsProvider"

export const FriendsCard = (props) => {
  const {searchTerms} = useContext(UsersContext)
  const {addFriends} = useContext(FriendsContext)

  const handleAddFriend = (event) => {
    const [prefix, id] = event.target.id.split("--")
    const newFriend = {
      userId: parseInt(id),
      currentUserId: parseInt(sessionStorage.nutshell_user)
    }

    addFriends(newFriend)
  }

  if (searchTerms !== ""){
    return (
      <div className="friend">
        <div className="friend__name">{props.friend.name}</div>
        <button className="friend__addFriend" id={`btn--${props.friend.id}`} onClick={handleAddFriend} >Add Friend</button>
      </div>
    )
  }else {
    return (
      <div className="friend">
        <div className="friend__name">{props.friend.name}</div>
      </div>
    )
  }
}