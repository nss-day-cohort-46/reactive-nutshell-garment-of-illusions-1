/*
 @author - cheo
 @return - Article component
*/

import React, { useContext } from "react"
import { useHistory } from "react-router-dom"

import "./Article.css"
import { ArticleContext } from "./ArticleProvider"


export const Article = ({ article }) => {
  const { deleteArticle } = useContext(ArticleContext)
  const history = useHistory()
  const userId = parseInt(sessionStorage.getItem("nutshell_user"))

  return (
    <article className="article">
      <h3 className="article__title">{ article.title }</h3>
      <p className="article__synopsis">{ article.synopsis }</p>
      <p className="article__poster">Posted by: { article.user.name }</p>
      <p className="article__timestamp">Posted: { article.timestamp }</p>
      <div className="btn--container">
        <button className="btn--link">
          <a className="article__link" href={ article.url }>Link</a>
        </button>
        {
          /*
            Users should only be able to delete their own articles.
          */
          article.user.id === userId ?
            <button className="btn--delete"
              onClick={(event) => {
                event.preventDefault() 
                deleteArticle(article.id).then(() => history.push("/")) }}>
              Delete
            </button>
          :
          <div></div>
        }
      </div>
    </article>
  )
}
