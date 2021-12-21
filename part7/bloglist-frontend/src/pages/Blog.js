import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

export const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const user = useSelector(({ user }) => user)
  const blog = useSelector(({ blogs }) => blogs.find(blog => blog.id === id))

  const addLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog, user.token))
    } catch (exception) {
      dispatch(setNotification(exception.message.error, 'error'))
    }
  }

  if (!blog) return null

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <div>{blog.likes} likes
        <button onClick={() => addLike(blog)}>like</button>
      </div>
      <p>added by {blog.user.name}</p>
    </div>
  )
}
