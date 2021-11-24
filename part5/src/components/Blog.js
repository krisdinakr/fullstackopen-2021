import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const Blog = ({ blog, handlerLike, handlerRemove }) => {
  const [visible, setVisible] = useState(false)
  const [like, setLike] = useState(blog.likes)
  const handlerDetail = () => setVisible(!visible)

  const addLike = (blog) => {
    handlerLike(blog)
    setLike(like + 1)
  }

  const removeBlog = (id) => {
    const confim = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confim) {
      handlerRemove(id)
    }
  }

  return (
    <div className="blog">
      <div>
        <p>{blog.title} {blog.author}</p>{' '}
        <button className="blog__btn-detail" onClick={handlerDetail}>
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      {visible && (
        <div className="blog__detail" >
          <p>{blog.url}</p>
          <p>likes {like}</p> <button onClick={() => addLike(blog)}>like</button>
          <p>{blog.user.username}</p>
          <button
            onClick={() => removeBlog(blog.id)}
            className="blog__btn-remove"
          >
            remove
          </button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handlerLike: PropTypes.func.isRequired,
  handlerRemove: PropTypes.func.isRequired
}