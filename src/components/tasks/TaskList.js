import { useHistory } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { Task } from "./Task"

export const TaskList = () => {
    const history = useHistory()
    const {getTasks, tasks} = useContext(TaskContext)

    useEffect(()=> {
        getTasks()
    },[])

    return (
        <>
            <div className="tasks">
                {tasks?.map(task => <Task key={task.id}
                                            task={task}/>)}
            <button onClick={()=> history.push("/tasks/create")}>Add Task</button>
            </div>
        </>
    )
}