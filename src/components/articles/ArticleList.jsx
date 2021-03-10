/*
 @author - cheo
 @returns - list of articles asssociated with given user
*/

import React, { useContext, useEffect } from "react"
import { Article } from "./Article"
import { ArticleContext } from "./ArticleProvider"
import "./ArticleList.css"
import { Link } from "react-router-dom"
import { FriendsContext } from "../friends/FriendsProvider"
import { WeatherContext } from "../weather/WeatherProvider"


export const ArticleList = () => {
 const { articles, getArticles } = useContext(ArticleContext)
 const { friends, getFriends } = useContext(FriendsContext)
 const { getTodaysWeather } = useContext(WeatherContext)

 const userId = parseInt(sessionStorage.nutshell_user)
 
 useEffect(() => {
  getTodaysWeather()
  .then(getFriends)
  .then(getArticles)
 }, []) // useEffect

 let filteredFriends = friends.filter(friend => friend.currentUserId === userId)
 let filteredArticles = filteredFriends.map(friend => {
   return articles.filter(article => article.userId === friend.userId)
 })
 filteredArticles.push(articles.filter(article => article.userId === userId))
 filteredArticles = filteredArticles.flat()

 return (
   <section className="articleList">
    <h2 className="articleList__header">Articles</h2>
    <button className="btn--add">
      <Link to={`/create`}>Add Article</Link>
    </button>
    <ul className="articleList__list">
    {
      filteredArticles.map(article => <Article key={ article.id } article={ article } />) // articles map
    }
    </ul>
   </section>
  ) // return
} // ArticleList
