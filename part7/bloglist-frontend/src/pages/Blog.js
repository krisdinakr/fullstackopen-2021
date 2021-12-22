import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addCommentBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

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
    console.log('here', e.target.comment.value)
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
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Box my={1}>
        <Typography
          variant="h3"
          component="h2"
        >
          {blog.title} {blog.author}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <Link href={blog.url} underline="hover">
            {blog.url}
          </Link>
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          mb={1}
          sx={{ alignItems: 'center' }}
        >
          <Typography variant="subtitle1">
            {blog.likes} likes
          </Typography>
          <Chip
            label="like"
            size="small"
            color="primary"
            variant="outlined"
            // icon={<ThumbUpOutlinedIcon />}
            onClick={() => addLike(blog)} />
        </Stack>
        <Typography variant="subtitle1" gutterBottom>
          added by {blog.user.name}
        </Typography>
      </Box>
      <Divider />
      <Box my={1}>
        <Typography variant="h6" component="p">
          comments
        </Typography>
        <form onSubmit={addComment}>
          <TextField
            label="Comment"
            variant="outlined"
            type="text"
            margin="normal"
            rows={4}
            fullWidth
            multiline
          />
          <Button
            size="small"
            color="secondary"
            variant="contained"
            name="comment"
            sx={{ width: '100%' }}
          >
            add comment
          </Button>
        </form>
        {!blog.comments.length && <Typography my={1}>no comment</Typography>}
        <List>
          {blog.comments.map((comment, index) => (
            <>
              <ListItem key={`${blog.id}-${index}`}>
                <ListItemText
                  primary={comment}
                />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Box>
    </Container>
  )
}
