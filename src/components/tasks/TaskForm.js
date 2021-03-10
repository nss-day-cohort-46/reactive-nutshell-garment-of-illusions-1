import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { TaskContext } from "./TaskProvider"

export const TaskForm = () => {

    const {addTask, updateTask, getTaskById} = useContext(TaskContext)
    const history = useHistory()
    const {taskId} = useParams()
    const [task, setTask] = useState({
        name: "",
        date: "",
        completed: false,
        userId: parseInt(sessionStorage.getItem("nutshell_user"))
    })

    useEffect(()=> {
        taskId ? getTaskById(parseInt(taskId)).then((task)=> setTask(task)) : console.log()
    }, [])

    const handleInputChange = (event) => {
        const newTask = {...task}
        newTask[event.target.id] = event.target.value
        setTask(newTask)
    }
    const saveTask = () => {
        if(taskId){
            updateTask({
                id : taskId,
                name: task.name,
                date: task.date,
                completed: task.completed,
                userId: task.userId
            })
            .then(history.push("/tasks"))
        }else{
            addTask(task)
            .then(history.push("/tasks"))
        }
    }
    

    return (
        <form className="taskForm">
          <h2 className="taskForm__title">{taskId? "Edit Task" : "New Task"}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Task Name:</label>
                  <input type="text" id="name" onChange={handleInputChange} required autoFocus className="form-control" placeholder="Task name" value={task.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="date">Finish Date: </label>
                  <input type="date" id="date" onChange={handleInputChange} required className="form-control" placeholder="Task Date" value={task.date}/>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={event =>{
              event.preventDefault()
              saveTask()}}>
                  {taskId ? "Edit Task" : "Create Task"}
          </button>
      </form>
    )


}