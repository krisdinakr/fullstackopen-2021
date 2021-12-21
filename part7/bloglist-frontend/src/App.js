import React, { useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Notification, FormLogin, Navbar } from './components'
import { Blog, Home, User, Users } from './pages'
import { initializedUser, loginAction } from './reducers/userReducer'
import { initializedBlogs } from './reducers/blogReducer'
import { initializedUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

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
    dispatch(initializedUsers())
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
      dispatch(setNotification(exception.message.error, 'error'))
    }
  }

  return (
    <Router>
      <div>
        {!user && (
          <>
            <Notification />
            <FormLogin handlerLogin={handlerLogin} />
          </>
        )
        }
        {user && (
          <>
            <Navbar user={user} />
            <h2>blogs app</h2>
            <Notification />
          </>
        )}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/users/:id" element={<User />} />
          <Route exact path="/blogs/:id" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
