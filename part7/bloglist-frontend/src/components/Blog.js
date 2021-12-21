import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'

export const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const handlerDetail = () => setVisible(!visible)
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const addLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog, user.token))
    } catch (exception) {
      dispatch(setNotification(exception.message.error, 'error'))
    }
  }

  const removeBlog = async (id) => {
    const confim = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confim) {
      try {
        await dispatch(deleteBlog(id, user.token))
      } catch (exception) {
        dispatch(setNotification(exception.message.error, 'error'))
      }
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
          <p>likes {blog.likes}</p> <button className="blog__btn-like" onClick={() => addLike(blog)}>like</button>
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
}