import { useState, createContext } from "react"

export const TaskContext = createContext()

export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([])

    const addTask = (task) => {
        return fetch("http://localhost:8088/tasks",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(task)
        })
        .then(getTasks)
    }
    const getTasks = () => {
        return fetch("http://localhost:8088/tasks")
        .then(res => res.json())
        .then(setTasks)
    }
    const completeTask = (taskId) => {
        return fetch(`http://localhost:8088/tasks/${taskId}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                completed:true
            })
        })
        .then(getTasks)
    }

    return(
        <TaskContext.Provider value= {{tasks, getTasks, addTask, setTasks, completeTask}}>
            {props.children}
        </TaskContext.Provider>
    )
}