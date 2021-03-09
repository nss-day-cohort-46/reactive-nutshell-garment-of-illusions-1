/*
 @author - cheo
 @returns - list of articles asssociated with given user
*/

import React, { useContext, useEffect } from "react"
import { Article } from "./Article"
import { ArticleContext } from "./ArticleProvider"
import "./ArticleList.css"
import { Link } from "react-router-dom"


export const ArticleList = () => {
 const { articles, getArticles } = useContext(ArticleContext)
 
 useEffect(() => {
  getArticles()
 }, []) // useEffect

 return (
   <section className="articleList">
    <h2 className="articleList__header">Articles</h2>
    <button className="btn--add">
      <Link to={`/create`}>Add Article</Link>
    </button>
    <ul className="articleList__list">
    {
      articles.map(article => <Article key={ article.id } article={ article } />) // articles map
    }
    </ul>
   </section>
  ) // return
} // ArticleList
