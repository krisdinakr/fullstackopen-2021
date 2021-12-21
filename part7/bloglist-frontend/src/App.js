import React, { useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Notification, Users } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { initializedUser } from './reducers/userReducer'
import { initializedBlogs } from './reducers/blogReducer'
import { Home } from './components/Home'

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
    const loggedUserJSON = window.localStorage.getItem('USER_LOGGED_IN')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializedUser(user))
    }
  }, [])

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
