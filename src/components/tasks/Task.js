export const Task = ({ task }) => {
    return (
      <section className="task">
        <h3 className="task__name">{task.name}</h3>
        <div className="task__date">{ task.date }</div>
        <div className="completed">Completed : {String(task.completed)}</div>
    </section>
  )}