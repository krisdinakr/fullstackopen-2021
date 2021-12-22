import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

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
    <Box sx={{
      p: 2,
      mb: 1,
      width: 400,
      borderRadius: 2,
      border: 2,
      borderColor: 'secondary.main',
    }}>
      <Typography
        variant="h6"
        component="h2"
        align='center'
        gutterBottom
      >
        Create New Blog
      </Typography>

      <form onSubmit={addBlog}>
        <TextField
          label="Title"
          variant="outlined"
          type="text"
          margin="dense"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          fullWidth
          required
        />
        <TextField
          label="Author"
          variant="outlined"
          type="text"
          margin="dense"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          fullWidth
          required
        />
        <TextField
          label="URL"
          variant="outlined"
          type="text"
          margin="dense"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          fullWidth
          required
        />
        <Button
          size="small"
          color="secondary"
          variant="contained"
          sx={{
            mt: 1,
            width: '100%'
          }}
        >
          create
        </Button>
      </form>
    </Box>
  )
}
