import { useHistory } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { Task } from "./Task"

export const TaskList = () => {
    const history = useHistory()
    const {getTasks, tasks} = useContext(TaskContext)

    useEffect(()=> {
        getTasks(parseInt(sessionStorage.getItem("nutshell_user")))
    },[])

    return (
        <>
            <div className="tasks">
                {tasks?.map(task => !task.completed ? <Task key={task.id}
                                            task={task}/> : <div key={task.id}></div>)}
            <button onClick={()=> history.push("/tasks/create")}>Add Task</button>
            </div>
        </>
    )
}