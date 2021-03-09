import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { TaskContext } from "./TaskProvider"

export const Task = ({ task }) => {
    const {completeTask} = useContext(TaskContext)
    const history = useHistory()
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
        <button onClick={(event) => history.push(`tasks/edit/${task.id}`)}>Edit Task</button>
    </section>
  )}