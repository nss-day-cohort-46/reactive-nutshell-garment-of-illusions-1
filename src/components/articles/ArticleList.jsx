/*
 @author - cheo
 @returns - list of articles asssociated with given user
*/

import React, { useContext, useEffect } from "react"
import { Article } from "./Article"
import { ArticleContext } from "./ArticleProvider"
import "./ArticleList.css"


export const ArticleList = () => {
 const { articles, getArticles } = useContext(ArticleContext)
 
 useEffect(() => {
  getArticles()
 }, []) // useEffect

 return (
   <section className="articleList">
    <h2 className="articleList__header">Articles</h2>
    <ul className="articleList__list">
    {
      articles.map(article => <Article key={ article.id } article={ article } />) // articles map
    }
    </ul>
   </section>
  ) // return
} // ArticleList