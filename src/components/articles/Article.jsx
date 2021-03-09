/*
 @author - cheo
 @return - Article component
*/

import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom"

import "./Article.css"
import { ArticleContext } from "./ArticleProvider"


export const Article = ({ article }) => {
  const { deleteArticle } = useContext(ArticleContext)
  const history = useHistory()
  const userId = parseInt(sessionStorage.getItem("nutshell_user"))

  return (
    <article className="article" style={article.userId === userId ? {} : {background: `cornsilk`}}>
      <h3 className="article__title">{article.userId === userId ? article.title : <i>{article.title}</i>}</h3>
      <p className="article__synopsis">{article.userId === userId ? article.synopsis : <i>{article.synopsis}</i>}</p>
      <p className="article__poster">{article.userId === userId ? `Posted by: ${article.user.name}` : <i>Posted by: {article.user.name}</i>}</p>
      <p className="article__timestamp">{article.userId === userId ? `Posted: ${article.timestamp}` : <i>Posted: {article.timestamp}</i>}</p>
      <div className="btn--container">
        <button className="btn--link">
          <a className="article__link" href={ article.url }>Link</a>
        </button>

        {
          /*
            Users should only be able to delete their own articles.
          */
          article.user.id === userId ?
            <button className="btn--edit">
              <Link to={`/edit/${article.id}`}>Edit</Link>
            </button>
          :
          <div className="btn--dummy"></div>
        }
        
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
          <div className="btn--dummy"></div>
        }
      </div>
    </article>
  )
}
