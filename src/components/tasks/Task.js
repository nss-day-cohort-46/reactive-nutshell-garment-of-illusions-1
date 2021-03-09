import { useContext } from "react"
import { TaskContext } from "./TaskProvider"

export const Task = ({ task }) => {
    const {completeTask} = useContext(TaskContext)
    const complete = () => {
        completeTask(task.id)
    }
    const {removeTask} = useContext(TaskContext)
    return (
      <section className="task">
        <h3 className="task__name">{task.name}</h3>
        <div className="task__date">{ task.date }</div>
        <div className="completed">Completed : {String(task.completed)}</div>
        <button key={task.id} onClick={complete}>complete</button> 
        <button onClick={(event) => removeTask(task.id)}>Delete Task</button>
    </section>
  )}