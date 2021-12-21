import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

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
    <div className="user-detail">
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}