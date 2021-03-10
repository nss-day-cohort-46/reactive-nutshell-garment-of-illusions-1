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

 const filtered = messages.filter(message => message.curentUserId === currentUserId)

 return (
  <section className="messageList">
   <h2 className="messageList__header">Messages</h2>
    <ul className="messageList__list">
     {
      filtered.map(message => <Message key={message.id} message={message} />)
     }
    </ul>
  </section>
 ) // return
} // MessageList