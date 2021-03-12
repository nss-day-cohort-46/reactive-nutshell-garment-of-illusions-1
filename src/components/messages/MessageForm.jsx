/*
 @author - cheo
 @return - MessageForm
*/

import { useContext, useEffect, useState } from "react"
import { UsersContext } from "../users/UsersProvider"
import { MessageContext } from "./MessageProvider"
import "./MessageForm.css"
import { useHistory, useParams } from "react-router"


const dateOptions = {
  hour: '2-digit',
  minute: '2-digit',
  year: "numeric",
  month: "numeric",
  day: "numeric"
}

export const MessageForm = () => {

  const { users, getUsers } = useContext(UsersContext)
  const { getMessages, sendMessage, getMessageById, updateMessage } = useContext(MessageContext)

  const [canViewMessageField, setCanViewMessageField] = useState(false)
  const [canSendMesssage, setCanSendMesssage] = useState(false)
  const [isPrivateMessage, setIsPrivateMessage] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [message, setMessage] = useState({})
  const [idForNewMessage, setIdForNewMessage] = useState(0)
  const [formField, setFormField] = useState({
    searchInput: "",
    message: ""
  })

  const { messageId } = useParams()
  const history = useHistory()


  const handleControlledInputChange = ( event ) =>  {
    const newformField = { ...formField }
    newformField[event.target.id] = event.target.value
    setFormField(newformField)
  } // handleControlledInputChange


  const handleSendMessage = ( event ) => {
    const dateObj = new Date()
    let searchInput = formField.searchInput
    let message = ''

    if(searchInput.includes("@")) {
      searchInput = searchInput.slice(1)
      message = "@PRIVATE-" + formField.message
    } else {
      message = formField.message
    }

    const recipient = users.find(user => searchInput.toLowerCase() === user.name.toLowerCase())
    const newMessage = {
      "curentUserId": recipient.id,
      "userId": parseInt(sessionStorage.getItem("nutshell_user")),
      "text": message,
      "timestamp": `${dateObj.toLocaleDateString('en-US', dateOptions)}`
    }

    setMessage(newMessage)

    if(messageId) {
      newMessage.id = idForNewMessage
      updateMessage(newMessage).then(getMessages).then(() => {
        setFormField({
          searchInput: "",
          message: ""
        })
        window.alert("Message Sent")
      }).then(history.push("/messages"))

    } else {
      sendMessage(newMessage).then(() => {
        setFormField({
          searchInput: "",
          message: ""
        })
        window.alert("Message Sent")
      }).then(history.push("/messages"))
    }
    localStorage.setItem("messageChange", false)
      

  } // handleSendMessage


  const filterUsers = ( searchTerm ) => {
    /*
      Show avaialble users.
      Clear users list if input field is empty or there are no users with given seearch string.
    */
    if(searchTerm.startsWith("@")) {
      searchTerm = searchTerm.slice(1)
      setIsPrivateMessage(true)
    } else {
      setIsPrivateMessage(false)
    }

    if(!searchTerm) {
      setFilteredUsers([])
    } else {
      const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
      if(filteredUsers.length) {
        setFilteredUsers(filteredUsers)
      } else {
        setFilteredUsers([])
      }
    }
  } // filterUsers


  useEffect(() => {
    getUsers()
    
    if(messageId) {

      setCanViewMessageField(true)
      setCanSendMesssage(true)
      getMessageById(messageId)
        .then(msg => {
          /*
            If recipient no longer exisits.
          */
         setIdForNewMessage(msg.id)
          let user = users.find(user => user.id === msg.curentUserId)
          if(user === undefined) {
            user = {
              name: "Recipient Not Available"
            }
          }
          const newFormField = {
            searchInput: user.name,
            message: msg.text
          }
          setFormField(newFormField)

        })
    } // if
  }, []) // useEffect


  useEffect(() => {

    let searchInput = formField.searchInput
    searchInput = searchInput.includes("@") ? searchInput.slice(1) : searchInput

    filterUsers(searchInput)
    const userNames = filteredUsers.map(user => user.name.toLowerCase())

    if(userNames.includes(searchInput.toLocaleLowerCase())) {
      setCanViewMessageField(true)
    } else {
      setCanViewMessageField(false)
    }

    if(formField.searchInput && formField.message) {
      setCanSendMesssage(true)
      setCanViewMessageField(true)
    } else {
      setCanSendMesssage(false)
    }


  }, [formField]) // useEffect


 return (
  
  <form action="" className="searchForm">
   {/* <h2 className="searchForm__header">Add Article</h2> */}
   <fieldset className="form-group">
    <label htmlFor="searchInput">Search: </label>
    <input 
     type="text" 
     id="searchInput" 
     name="searchInput"
     className="form-control" 
     placeholder="Friend's name..."
    value={formField.searchInput}
    onChange={(e) => {handleControlledInputChange(e)}}
     autoFocus />
   </fieldset>

   {
     filteredUsers.length ?
      <ul className="filteredUsers">
        {
          filteredUsers.map(user => <li key={user.id} className="filteredUsers__user">{ user.name }</li>)
        }
      </ul>
     :
     <></>
   }

   {
    canViewMessageField ? 
    <fieldset className="form-group">
      <label htmlFor="message">Message: </label>
      <textarea 
      name="message" 
      id="message" 
      cols="30" 
      rows="10" 
      className="form-control" 
      placeholder="Message"
       value={formField.message}
       onChange={handleControlledInputChange}
      autoFocus>
      </textarea>
      <button className="btn--save"
      onClick={event => {
       event.preventDefault() 
       handleSendMessage()
      }}
      disabled={!canSendMesssage}> {/* TODO: CSS to show if button is disabled or not */}
      Send
      </button>
    </fieldset>
   : <div></div>
  }
  </form> 
  ) // return
}
