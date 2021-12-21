import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormCreate, Toggable } from '../components'

export const Home = () => {
  const blogFormRef = useRef()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)

  const blogForm = () => (
    <Toggable buttonLabel="create new blog" ref={blogFormRef}>
      <FormCreate />
    </Toggable>
  )

  if (!user) return null

  return (
    <div className="home">
      {blogForm()}
      <br />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div className='blog' key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  )
}