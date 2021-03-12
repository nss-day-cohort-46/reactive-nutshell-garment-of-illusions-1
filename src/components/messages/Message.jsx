/*
 @author - cheo
 @return - Message component that renders properties of message object passsed in.
*/

import { Link } from "react-router-dom"
import "./Message.css"


export const Message = ({ message }) => {
 return (
  <li className="messageList__item">
   <article className="message">
    <h3 className="message__header">{ message.timestamp }</h3>
    {/* If message is from logged-in user, show To field, else show From field.*/}
    <p className="message__from"> { message.recipient ? `To: ${message.recipient}` : `From: ${message.user.name}`}</p>
    <p className="message__text">{ message.text }</p>
    {
     message.canEdit ?
     <button className="btn--edit">
     <Link to={`/messages/edit/${message.id}`}>
       Edit
      </Link>
     </button>
     :
     <></>
    }
   </article>
  </li>
 )
}
