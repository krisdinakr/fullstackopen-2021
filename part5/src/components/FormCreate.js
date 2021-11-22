import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const FormCreate = ({ handlerCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    handlerCreate({ title, author, url })
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
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

FormCreate.propTypes = {
  handlerCreate: PropTypes.func.isRequired
}