import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'

export const FormCreate = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const addBlog = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createBlog({ title, author, url }, user.token))
      dispatch(setNotification(`a new blog ${title} by ${author} added`, 'success'))
    } catch (exception) {
      dispatch(setNotification(exception.message.error, 'error'))
    }
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        <button id="create-button">create</button>
      </form>
    </div>
  )
}
