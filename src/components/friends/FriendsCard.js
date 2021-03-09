import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { UsersContext } from "../users/UsersProvider"
import { FriendsContext } from "./FriendsProvider"

export const FriendsCard = (props) => {
  const {searchTerms, setSearchTerms} = useContext(UsersContext)
  const {addFriends} = useContext(FriendsContext)

  const history = useHistory()

  const handleAddFriend = (event) => {
    const [prefix, id] = event.target.id.split("--")
    const newFriend = {
      userId: parseInt(id),
      currentUserId: parseInt(sessionStorage.nutshell_user)
    }

    addFriends(newFriend)
    .then(setSearchTerms(""))
    .then(history.push("/friends"))
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