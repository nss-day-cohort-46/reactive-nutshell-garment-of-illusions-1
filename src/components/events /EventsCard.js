export const EventsCard = (props) => {
  return (
    <div className="event">
      <div className="event__name">Event Name: {props.event.name}</div>
      <div className="event__location">Location: {props.event.location}</div>
      <div className="event__date">Date: {props.event.date}</div>
    </div>
  )
}