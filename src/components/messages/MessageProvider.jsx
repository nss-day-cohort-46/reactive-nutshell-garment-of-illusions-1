/*
 @author - cheo
 @return MessageContext.Provider with methods to manipulate messages data.
*/
import React, { createContext, useState } from "react" 

export const MessageContext = createContext()

export const MessageProvider = ( props ) => {

 const [messages, setMessages] = useState([])

 const _byDate = (currDate, nextDate) => {
   /*
     Sort by month, day, year, time.

     Workaround to json-server's &_sort= .
     Does not sort correctly if using double-digit days.
   */

   if ( Date.parse(nextDate.timestamp) < Date.parse(currDate.timestamp) ) { return -1; }
   if ( Date.parse(nextDate.timestamp) > Date.parse(currDate.timestamp) ) { return 1; }
   return 0;
 } // _byDate
 

 const getMessages = () => {
  return fetch("http://localhost:8088/messages?_expand=user")
   .then(res => res.json())
   .then(data => data.sort(_byDate))
   .then(setMessages)
 } // getMessages


 const sendMessage = ( message ) => {
    return fetch(`http://localhost:8088/messages`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(message)
   })
    .then(getMessages)
 } // sendMessage


 const getMessageById = ( id ) => {
  return fetch(`http://localhost:8088/messages/${id}`)
   .then(res => res.json())
  //  .then(setMessages)
 } //getMessageById


 const updateMessage = ( message ) => {
    return fetch(`http://localhost:8088/messages/${message.id}`, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(message)
   })
    .then(getMessages)
 } // sendMessage

 return (
  <MessageContext.Provider value={{
   messages,
   getMessages,
   sendMessage,
   getMessageById,
   updateMessage
  }}>
   { props.children }
  </MessageContext.Provider>
 )
} // MessageProvider
