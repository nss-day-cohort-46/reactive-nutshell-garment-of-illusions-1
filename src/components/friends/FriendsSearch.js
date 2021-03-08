import React, { useContext } from "react"
import { UsersContext } from "../users/UsersProvider"

export const FriendsSearch = () => {
  const {setSearchTerms} = useContext(UsersContext)

  return (
    <>
      <button className="friends__searchBtn" >Add a Friend</button>
      <input type="text" placeholder="Friend's name..." onKeyUp={(event) => setSearchTerms(event.target.value)} />
    </>
  )
}