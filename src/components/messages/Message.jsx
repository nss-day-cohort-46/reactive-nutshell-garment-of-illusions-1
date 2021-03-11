/*
 @author - cheo
 @return - Message component that renders properties of message object passsed in.
*/

import "./Message.css"

export const Message = ({ message }) => {
 return (
  <li className="messageList__item">
   <article className="message">
    <h3 className="message__header">{ message.timestamp }</h3>
    <p className="message__from">From: { message.user.name }</p>
    <p className="message__text">{ message.text }</p>
   </article>
  </li>
 )
}
