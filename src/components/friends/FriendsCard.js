import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { UsersContext } from "../users/UsersProvider"
import { FriendsContext } from "./FriendsProvider"
import Button from "react-bootstrap/Button"
import { Accordion, Card } from "react-bootstrap"

export const FriendsCard = (props) => {
  const {searchTerms, setSearchTerms} = useContext(UsersContext)
  const {friends, getFriends, addFriends, removeFriend} = useContext(FriendsContext)

  const history = useHistory()

  useEffect(() => {
    getFriends()
  }, [])

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

  const handleRemoveFriend = (event => {
    const [prefix, id] = event.target.id.split("--")

    const filteredFriends = friends.filter(friend => friend.currentUserId === parseInt(sessionStorage.nutshell_user))
    const matchingFriend = filteredFriends.find(friend => friend.userId === parseInt(id))
    
    removeFriend(matchingFriend.id)
  })

  if (searchTerms !== ""){
    return (
      <div className="friend">
        <div className="friend__name">{props.friend.name}</div>
        <Button variant="success" className="friend__addFriend friends__btn" id={`btn--${props.friend.id}`} onClick={handleAddFriend} >Add Friend</Button>
      </div>
    )
  }else {
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={props.friend.id}>
          <div className="friend__name">{props.friend.name}</div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={props.friend.id}>
          <Card.Body><Button variant="danger" className="friend__removeFriend friends__btn" id={`btn--${props.friend.id}`} onClick={handleRemoveFriend} >Remove Friend</Button></Card.Body>
        </Accordion.Collapse>
      </Card>

      // <div className="friend">
      //   <div className="friend__name">{props.friend.name}</div>
      //   <Button variant="danger" className="friend__removeFriend friends__btn" id={`btn--${props.friend.id}`} onClick={handleRemoveFriend} >Remove Friend</Button>
      // </div>
    )
  }
}