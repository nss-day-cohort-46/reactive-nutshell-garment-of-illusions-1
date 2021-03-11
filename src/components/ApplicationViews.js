import React from "react"
import { Route } from "react-router-dom"
import { ArticleForm } from "./articles/ArticleForm"
import { ArticleList } from "./articles/ArticleList"
import { ArticleProvider } from "./articles/ArticleProvider"
import { FriendsList } from "./friends/FriendsList"
import { FriendsProvider } from "./friends/FriendsProvider"
import { FriendsSearch } from "./friends/FriendsSearch"
import { UsersProvider } from "./users/UsersProvider"
import { TaskForm } from "./tasks/TaskForm"
import { TaskList } from  "./tasks/TaskList"
import { TaskProvider } from "./tasks/TaskProvider"
import { EventsList } from "./events /EventsList"
import { EventsProvider } from "./events /EventsProvider"
import { EventsForm } from "./events /EventsForm"
import { UserEventsProvider } from "./events /UserEventsProvider"
import { MessageProvider } from "./messages/MessageProvider"
import { MessageList } from "./messages/MessageList"
import { WeatherProvider } from "./weather/WeatherProvider"
import { WeatherList } from "./weather/WeatherList"
import { MessageForm } from "./messages/MessageForm"


export const ApplicationViews = () => {
  return (
    <>
    <WeatherProvider>
      <FriendsProvider>
      <ArticleProvider>
        <Route exact path="/">
          {/* Render the component for news articles */}
          <ArticleList />
          <WeatherList />
        </Route>
        <Route exact path="/create">
          {/* Render the component for news articles */}
          <ArticleForm />
        </Route>
        <Route exact path="/edit/:articleId(\d+)">
          {/* Render the component for news articles */}
          <ArticleForm />
        </Route>
      </ArticleProvider>
      </FriendsProvider>
    </WeatherProvider>
      

      <FriendsProvider>
      <UsersProvider>
        <Route exact path="/friends">
          {/* Render the component for list of friends */}
          <FriendsList />
        </Route>

        <Route exact path="/friends/search">
          <FriendsSearch />
        </Route>
      </UsersProvider>
      </FriendsProvider>

      <MessageProvider><UsersProvider>
        <Route exact path="/messages">
          {/* Render the component for the messages */}
          <MessageList />
        </Route>
        <Route exact path="/messages/edit/:messageId(\d+)">
          {/* Render the component for the messages */}
          <MessageForm />
        </Route>
      </UsersProvider></MessageProvider>

      <TaskProvider>
        <Route exact path="/tasks">
          <TaskList/>
        </Route>
        <Route exact path="/tasks/create">
          <TaskForm/>
        </Route>
        <Route exact path="/tasks/edit/:taskId(\d+)">
          <TaskForm/>
        </Route>
      </TaskProvider>
      <WeatherProvider>
        <FriendsProvider>
        <UserEventsProvider>
        <EventsProvider>
          <Route exact path="/events">
            <EventsList />
          </Route>

          <Route exact path="/events/create">
            <EventsForm />
          </Route>

          <Route exact path="/events/edit/:eventId(\d+)">
            <EventsForm />
          </Route>
        </EventsProvider>
        </UserEventsProvider>
        </FriendsProvider>
      </WeatherProvider>
    </>
  )
}
