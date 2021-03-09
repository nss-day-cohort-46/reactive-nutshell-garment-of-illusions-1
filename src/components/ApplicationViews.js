import React from "react"
import { Route } from "react-router-dom"
import { ArticleForm } from "./articles/ArticleForm"
import { ArticleList } from "./articles/ArticleList"
import { ArticleProvider } from "./articles/ArticleProvider"
import { TaskForm } from "./tasks/TaskForm"
import { TaskList } from  "./tasks/TaskList"
import { TaskProvider } from "./tasks/TaskProvider"


export const ApplicationViews = () => {
  return (
    <>
      <ArticleProvider>
        <Route exact path="/">
          {/* Render the component for news articles */}
          <ArticleList />
        </Route>
        <Route exact path="/create">
          {/* Render the component for news articles */}
          <ArticleForm />
        </Route>
      </ArticleProvider>

      <Route path="/friends">
        {/* Render the component for list of friends */}
      </Route>
      <Route path="/messages">
        {/* Render the component for the messages */}
      </Route>
      <TaskProvider>
        <Route exact path="/tasks">
          <TaskList/>
        </Route>
        <Route exact path="/tasks/create">
          <TaskForm/>
        </Route>
      </TaskProvider>
      <Route path="/events">
        {/* Render the component for the user's events */}
      </Route>
    </>
  )
}
