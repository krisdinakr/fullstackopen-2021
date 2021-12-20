import React, { useEffect, useCallback, useRef } from 'react'
import {
  Blog,
  FormLogin,
  FormCreate,
  Notification,
  Toggable,
} from './components'
import { useDispatch, useSelector } from 'react-redux'
import { BaseService } from './services'
import { initializedUser, loginAction, logoutAction } from './reducers/userReducer'
import { initializedBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)

  const getBlogList = useCallback(async () => {
    if (user) {
      await dispatch(initializedBlogs(user.token))
    }
  }, [user])

  useEffect(() => {
    getBlogList()
  }, [getBlogList, user])

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('USER_LOGGED_IN', JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('USER_LOGGED_IN')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializedUser(user))
    }
  }, [])

  const handlerLogin = async (data) => {
    try {
      await dispatch(loginAction(data))
    } catch (exception) {
      console.log('err', exception)
      dispatch(setNotification(exception.message.error, 'error'))
    }
  }

  const handlerLogout = () => {
    window.localStorage.clear()
    dispatch(logoutAction())
  }

  // const handlerCreate = async (blogObj) => {
  //   try {
  //     await dispatch(createBlog(blogObj, user.token))
  //     dispatch(setNotification(`a new blog ${blogObj.title} by ${blogObj.author} added`, 'success'))
  //   } catch (exception) {
  //     dispatch(setNotification(exception.message.error, 'error'))
  //   }
  //   blogFormRef.current.toggleVisibility()
  // }

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
      dispatch(setNotification(exception.message.error, 'error'))
    }
  }

  const handlerRemove = async (id) => {
    try {
      await BaseService.delete(`/api/blogs/${id}`, user.token)
      // const blogListUpdated = blogs.filter((blog) => blog.id !== id)
      // setBlogs(blogListUpdated)
    } catch (exception) {
      dispatch(setNotification(exception.message.error, 'error'))
    }
  }

  const loginForm = () => (
    <div>
      <FormLogin handlerLogin={handlerLogin} />
    </div>
  )

  const blogForm = () => (
    <Toggable buttonLabel="create new blog" ref={blogFormRef}>
      <FormCreate />
    </Toggable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user ? (
        loginForm()
      ) : (
        <>
          <span>{user.name} logged-in</span>
          <button id="logout-button" onClick={handlerLogout}>logout</button>
          {blogForm()}
          <br />
          <section>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog blog={blog} key={blog.id} handlerLike={handlerLike} handlerRemove={handlerRemove} />
              ))}
          </section>
        </>
      )}
    </div>
  )
}

export default App
