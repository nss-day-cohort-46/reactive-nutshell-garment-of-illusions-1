/*
 @author - cheo
 @return - list of messages for given user.
*/

import React, { useContext, useEffect } from "react"
import { Message } from "./Message"
import { MessageContext } from "./MessageProvider"
import { UsersContext } from "../users/UsersProvider"
import "./MessageList.css"

import { MessageForm } from "./MessageForm"


export const MessageList = () => {
 const { messages, getMessages } = useContext(MessageContext)
 const { users, getUsers } = useContext(UsersContext)
 const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))

 useEffect(() => {
  getMessages().then(getUsers)
 }, [])
 window.onstorage = (e) => {
   getMessages()
 }
 const filteredReceived = messages.filter(message => message.curentUserId === currentUserId)
 const filteredSent = messages.filter(message => message.userId === currentUserId)
 filteredSent.forEach(message => message.canEdit = true)
 filteredSent.forEach(message => {
   let user = users.find(user => user.id == message.curentUserId)
   if(user){

   message.recipient = user.name
   } else {
     message.recipient = "User not found"
   }
 })


 
 let allMessagesExceptPrivate = []
 let privateMessages = []

 messages.forEach(msg => {
   if(msg.text.startsWith("@PRIVATE-")) {
     privateMessages.push(msg)
   } else {
     allMessagesExceptPrivate.push(msg)
   }
 })


 allMessagesExceptPrivate = allMessagesExceptPrivate.map(msg => {
  return `
  From: ${ msg.userId }
  To: ${ msg.curentUserId }
  Msg: ${ msg.text }
  Time: ${ msg.timestamp }
  `
 }).join("\n")


 privateMessages = privateMessages.map(msg => {
   const text = msg.text.split("@PRIVATE-")[1]
  return `
  From: ${ msg.userId }
  To: ${ msg.curentUserId }
  Msg: ${ text }
  Time: ${ msg.timestamp }
  `
 }).join("\n")


 return (
  <main className="mainMessage">
  <section className="forMessageBoard">
    <h2 className="messageList__header">Message Board</h2>
    <textarea 
      name="message" 
      id="message" 
      cols="30" 
      rows="10" 
      className="form-control msgBoard" 
      placeholder="Message"
       value={allMessagesExceptPrivate}
      autoFocus>
    </textarea>
    <h2 className="messageList__header">Private Message Board</h2>
    <textarea 
      name="message" 
      id="message" 
      cols="30" 
      rows="10" 
      className="form-control msgBoard" 
      placeholder="Message"
       value={privateMessages}
      autoFocus>
    </textarea>
   </section>
  <section className="forMessages">
    <section className="messageList">
      <h2 className="messageList__header">Messages</h2>
      <ul className="messageList__list">
        {
        filteredReceived.map(message => <Message key={message.id} message={message} />)
        }
      </ul>
    </section>

      <section className="messageList">
      <h2 className="messageList__send">Send</h2>

      <MessageForm />

      <ul className="messageList__list">
        {
        filteredSent.map(message => <Message key={message.id} message={message} />)
        }
      </ul>
    </section>

  </section>
  </main>
 ) // return
} // MessageList