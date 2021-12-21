import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addCommentBlog, likeBlog } from '../reducers/blogReducer'
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

  const addComment = async (e) => {
    e.preventDefault()
    try {
      const data = {
        id: blog.id,
        comment: e.target.comment.value
      }
      await dispatch(addCommentBlog(data, user.token))
    } catch (exception) {
      dispatch(setNotification(exception.message.error, 'error'))
    }
    e.target.comment.value = ''
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

      <p><b>comments</b></p>
      <form onSubmit={addComment}>
        <input type="text" name='comment' />
        <button>add comment</button>
      </form>
      {!blog.comments.length && <p>no comment</p>}
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={`${blog.id}-${index}`}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}
