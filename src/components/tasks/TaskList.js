import { useHistory } from "react-router-dom"
import React from "react"

export const TaskList = () => {
    
    const history = useHistory()

    return (
        <>
            <button onClick={()=> history.push("/tasks/create")}>Add Task</button>
        </>
    )
}