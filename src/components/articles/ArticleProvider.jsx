/*
 @author - cheo
 @return - Articles data.
*/

import React, { createContext, useState } from "react"


export const ArticleContext = createContext()


export const ArticleProvider = ( props ) => {

 const [articles, setArticles] = useState([])

 console.log("in ArticleProvider")

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

 return (
  <ArticleContext.Provider value={{
   articles, getArticles
  }}>
   { props.children }
  </ArticleContext.Provider>
 ) // return
} // getArticles