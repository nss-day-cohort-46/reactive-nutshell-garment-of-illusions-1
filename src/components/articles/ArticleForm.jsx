/*
 @author - cheo
 @return - article form to add article.
*/
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { ArticleContext } from "./ArticleProvider"
import "./ArticleForm.css"


 const dateOptions = {
  hour: '2-digit',
  minute: '2-digit',
  year: "numeric",
  month: "numeric",
  day: "numeric"
 }


export const ArticleForm = () => {

 const { addArticle, getArticles, getArticleById, updateArticle } = useContext(ArticleContext)
 const history = useHistory()
 const { articleId } = useParams()



 const [article, setArticles] = useState({
   userId: parseInt(sessionStorage.getItem("nutshell_user")),
   url: "",
   title: "",
   synopsis: "",
   timestamp: ""
 })


 useEffect(() => {
   getArticles()
   if(articleId) {
     getArticleById(articleId)
      .then(article => {
        setArticles(article)
      })
   }
 }, []) // useEffect


 const handleControlledInputChange = ( event ) => {
  const newArticle = { ...article }
  const dateObj = new Date()

  newArticle[event.target.id] = event.target.value
  newArticle.timestamp = `${dateObj.toLocaleDateString('en-US', dateOptions)}`

  setArticles(newArticle)
 } // handleControlledInputcChange


 const handleSaveArticle = () => {
  
   if(!articleId) {
    addArticle(article)
      .then(() => history.push("/"))
   } else {
      if (parseInt(sessionStorage.getItem("nutshell_user")) === article.userId) {
      updateArticle(article)
        .then(getArticles)
        .then(() => history.push("/"))
      } else {
        window.alert("You cannot edit this post")
        history.push("/")
      }
   }
 } // handleSaveArticle


 return (
  <form action="" className="articleForm">
   <h2 className="articleForm__header">Add Article</h2>
   <fieldset className="form-group">
    <label htmlFor="title">Title: </label>
    <input 
     type="text" 
     id="title" 
     name="title"
     className="form-control" 
     placeholder="Article Title"
     value={article.title}
     onChange={handleControlledInputChange}
     required 
     autoFocus />
   </fieldset>
   <fieldset className="form-group">
    <label htmlFor="url">Article Url: </label>
    <input 
     type="url" 
     id="url" 
     name="url"
     className="form-control" 
     placeholder="https://example.com"
     value={article.url}
     onChange={handleControlledInputChange}
     pattern="https://.*"
     required 
     autoFocus />
   </fieldset>
   <fieldset className="form-group">
    <label htmlFor="synopsis">Synopsis: </label>
    <textarea 
     name="synopsis" 
     id="synopsis" 
     cols="30" 
     rows="10" 
     className="form-control" 
     placeholder="Synopsis"
     value={article.synopsis}
     onChange={handleControlledInputChange}>
    </textarea>
    <button className="btn--save"
     onClick={event => {
      event.preventDefault() 
      handleSaveArticle()
     }}>
     Save Article
    </button>
   </fieldset>
  </form> 
 ) // return
}