/*
 @author - cheo
 @return - Articles data.
*/

import React, { createContext, useState } from "react"


export const ArticleContext = createContext()


export const ArticleProvider = ( props ) => {

  const [articles, setArticles] = useState([])


  const _byDate = (currDate, nextDate) => {
    /*
      Sort by month, day, year, time.

      Workaround to json-server's &_sort= .
      Does not sort correctly if using double-digit days.
    */

    if ( Date.parse(nextDate.timestamp) < Date.parse(currDate.timestamp) ) { return -1; }
    if ( Date.parse(nextDate.timestamp) > Date.parse(currDate.timestamp) ) { return 1; }
    return 0;
  } // _byDate


 const getArticles = () => {
  return fetch("http://localhost:8088/articles?_expand=user")
   .then(res => res.json())
   .then(data => data.sort(_byDate))
   .then(setArticles)
 } // getArticles


 const addArticle = ( article ) => {
   return fetch("http://localhost:8088/articles", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(article)
   })
    .then(getArticles)
 } // addArticle


 const deleteArticle = ( articleId ) => {
   console.log(`article idd: ${articleId}`)
  //  debugger
   return fetch(`http://localhost:8088/articles/${articleId}`, {
     method: "DELETE"
   })
    .then(getArticles)
 } // deleteArticle


 const updateArticle = ( article ) => {
   return fetch(`http://localhost:8088/articles/${article.id}`, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(article)
   })
   .then(getArticles)
 } // editArticle


 const getArticleById = ( id ) => {
   return fetch(`http://localhost:8088/articles/${id}?_expand=user`)
    .then(res => res.json())
 } // getArticleById


 return (
  <ArticleContext.Provider value={{
   articles,
   getArticles,
   addArticle,
   deleteArticle,
   updateArticle,
   getArticleById
  }}>
   { props.children }
  </ArticleContext.Provider>
 ) // return
} // getArticles
