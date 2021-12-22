import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

export const User = () => {
  const { id } = useParams()
  const user = useSelector(({ users }) => {
    if (users) {
      return users.find(user => user.id === id)
    }
    return null
  })

  console.log(user)

  if (!user) return null

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Box my={1}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
        >
          {user.name}
        </Typography>
        <Typography
          variant="subtitle1"
        >
          added blogs
        </Typography>
        <List>
          {user.blogs.map(blog => (
            <ListItem key={blog.id}>
              <ListItemText
                primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  )
}