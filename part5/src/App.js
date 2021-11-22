import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  Blog,
  FormLogin,
  FormCreate,
  Notification,
  Toggable,
} from './components'
import { BaseService } from './services'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const blogFormRef = useRef()

  const getBlogList = useCallback(async () => {
    if (user) {
      const blogList = await BaseService.get('/api/blogs', {}, user.token)
      blogList.sort((a, b) => b.likes - a.likes)
      setBlogs(blogList)
    }
  }, [user])

  useEffect(() => {
    getBlogList()
  }, [getBlogList, user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('USER_LOGGED_IN')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handlerLogin = async (data) => {
    try {
      const user = await BaseService.post('/api/login', data)
      setUser(user)
      window.localStorage.setItem('USER_LOGGED_IN', JSON.stringify(user))
    } catch (exception) {
      setErrorMessage(exception.message.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handlerLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handlerCreate = async (blogObj) => {
    try {
      const result = await BaseService.post('/api/blogs', blogObj, user.token)
      if (result.id) {
        setBlogs(blogs.concat(result))
        setSuccessMessage(
          `a new blog ${result.title} by ${result.author} added`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setErrorMessage(exception.message.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    blogFormRef.current.toggleVisibility()
  }

  const handlerLike = async (blog) => {
    try {
      await BaseService.put(
        `/api/blogs/${blog.id}`,
        {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes + 1,
        },
        user.token
      )
    } catch (exception) {
      setErrorMessage(exception.message.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handlerRemove = async (id) => {
    try {
      await BaseService.delete(`/api/blogs/${id}`, user.token)
      const blogListUpdated = blogs.filter((blog) => blog.id !== id)
      setBlogs(blogListUpdated)
    } catch (exception) {
      setErrorMessage(exception.message.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <FormLogin handlerLogin={handlerLogin} />
    </div>
  )

  const blogForm = () => (
    <Toggable buttonLabel="create new blog" ref={blogFormRef}>
      <FormCreate handlerCreate={handlerCreate} />
    </Toggable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification type="error" message={errorMessage} />
      <Notification message={successMessage} />
      {!user ? (
        loginForm()
      ) : (
        <>
          <span>{user.username} logged-in</span>
          <button onClick={handlerLogout}>logout</button>
          {blogForm()}
          <br />
          <section>
            {blogs.map((blog) => (
              <Blog blog={blog} key={blog.id} handlerLike={handlerLike} handlerRemove={handlerRemove} />
            ))}
          </section>
        </>
      )}
    </div>
  )
}

export default App
