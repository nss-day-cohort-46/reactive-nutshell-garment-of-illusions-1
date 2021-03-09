/*
 @author - cheo
 @return - Article component
*/

import React from "react"
import "./Article.css"


export const Article = ({ article }) => (
 <div className="article">
  <h3 className="article__title">{ article.title }</h3>
  <p className="article__synopsis">{ article.synopsis }</p>
  <p className="article__poster">Posted by: { article.user.name }</p>
  <p className="article__timestamp">Posted: { article.timestamp }</p>
  <a className="article__link" href={ article.url }>View</a>
  </div>

)
