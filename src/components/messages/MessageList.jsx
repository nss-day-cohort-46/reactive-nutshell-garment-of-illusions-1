/*
 @author - cheo
 @return - list of messages for given user.
*/

import React, { useContext, useEffect } from "react"
import { Message } from "./Message"
import { MessageContext } from "./MessageProvider"
import "./MessageList.css"

export const MessageList = () => {

 const { messages, getMessages } = useContext(MessageContext)
 const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))

 useEffect(() => {
  getMessages()
 }, []) // useEffect

 const filteredReceived = messages.filter(message => message.curentUserId === currentUserId)
 const filteredSent = messages.filter(message => message.userId === currentUserId)


 return (
  <>
   <section className="messageList">
    <h2 className="messageList__header">Messages</h2>
     <ul className="messageList__list">
      {
       filteredReceived.map(message => <Message key={message.id} message={message} />)
      }
     </ul>
   </section>

   <input type="text"/>
   
     <section className="messageList">
    <h2 className="messageList__send">Send</h2>
     <ul className="messageList__list">
      {
       filteredSent.map(message => <Message key={message.id} message={message} />)
      }
     </ul>
   </section>
  </>
  
 ) // return
} // MessageList