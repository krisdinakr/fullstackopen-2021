import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { FormCreate, Toggable } from '../components'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'

export const Home = () => {
  const blogFormRef = useRef()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)

  const blogForm = () => (
    <Toggable buttonLabel="create new blog" ref={blogFormRef}>
      <FormCreate />
    </Toggable>
  )

  if (!user) return <Navigate to="/login" replace={true} />

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant='h4' component='h2' align='center' >
        Blogs
      </Typography>
      {blogForm()}
      <Box>
        <List>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Link
                key={blog.id}
                style={{ color: 'white', textDecoration: 'none' }}
                to={`/blogs/${blog.id}`}
              >
                <ListItem
                  sx={{
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    mb: 1, '&:hover': { backgroundColor: 'primary.dark' }
                  }}
                >
                  <ListItemText primary={blog.title} />
                </ListItem>
              </Link>
            ))}
        </List>
      </Box>
    </Container>
  )
}