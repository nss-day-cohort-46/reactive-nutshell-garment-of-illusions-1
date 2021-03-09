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
        .then(()=>getTasks(parseInt(sessionStorage.getItem("nutshell_user"))))
    }
    const getTasks = (userId) => {
        return fetch(`http://localhost:8088/tasks?userId=${userId}`)
        .then(res => res.json())
        .then(setTasks)
    }
    const getTaskById = (taskId) => {
        return fetch(`http://localhost:8088/tasks/${taskId}`)
        .then(res => res.json())
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
        .then(()=>getTasks(parseInt(sessionStorage.getItem("nutshell_user"))))
    }
    const removeTask = (taskId) => {
        return fetch(`http://localhost:8088/tasks/${taskId}`, {
            method: "DELETE"
        })
        .then(()=>getTasks(parseInt(sessionStorage.getItem("nutshell_user"))))

    }
    const updateTask = (task) => {
        return fetch(`http://localhost:8088/tasks/${task.id}`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(task)
        })
        .then(()=>getTasks(parseInt(sessionStorage.getItem("nutshell_user"))))
    }

    return(
        <TaskContext.Provider value= {{tasks, getTasks, addTask, setTasks, removeTask, completeTask, updateTask, getTaskById}}>
            {props.children}
        </TaskContext.Provider>
    )
}