import React from "react"
import { Route } from "react-router-dom"
import { FriendsList } from "./friends/FriendsList"
import { FriendsProvider } from "./friends/FriendsProvider"
import { FriendsSearch } from "./friends/FriendsSearch"
import { UsersProvider } from "./users/UsersProvider"

export const ApplicationViews = () => {
  return (
    <>

      <Route exact path="/">
        {/* Render the component for news articles */}
      </Route>

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

      <Route exact path="/messages">
        {/* Render the component for the messages */}
      </Route>
      <Route exact path="/tasks">
        {/* Render the component for the user's tasks */}
      </Route>
      <Route exact path="/events">
        {/* Render the component for the user's events */}
      </Route>
    </>
  )
}
