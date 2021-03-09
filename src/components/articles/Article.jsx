/*
 @author - cheo
 @return - Article component
*/

import React from "react"
import { Link } from "react-router-dom"
import "./Article.css"


export const Article = ({ article }) => (
  <article className="article">
    <h3 className="article__title">{ article.title }</h3>
    <p className="article__synopsis">{ article.synopsis }</p>
    <a className="article__link" href={ article.url }>Link</a>
    <p className="article__poster">Posted by: { article.user.name }</p>
    <p className="article__timestamp">Posted: { article.timestamp }</p>
    <button className="btn--link">
      <Link className="article__router_link" to={`/article/detail`}>View</Link>
    </button>
  </article>
)
