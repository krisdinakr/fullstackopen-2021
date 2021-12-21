import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Blog, FormCreate, FormLogin, Toggable } from '.'
import { setNotification } from '../reducers/notificationReducer'
import { loginAction, logoutAction } from '../reducers/userReducer'

export const Home = () => {
  const blogFormRef = useRef()
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)

  const handlerLogin = async (data) => {
    try {
      await dispatch(loginAction(data))
    } catch (exception) {
      dispatch(setNotification(exception.message.error, 'error'))
    }
  }

  const handlerLogout = () => {
    window.localStorage.clear()
    dispatch(logoutAction())
  }

  const blogForm = () => (
    <Toggable buttonLabel="create new blog" ref={blogFormRef}>
      <FormCreate />
    </Toggable>
  )

  if (!user) {
    return (
      <div className="home">
        <FormLogin handlerLogin={handlerLogin} />
      </div>
    )
  }

  return (
    <div className="home">
      <span>{user.name} logged-in</span>
      <button id="logout-button" onClick={handlerLogout}>logout</button>
      {blogForm()}
      <br />
      <section>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog blog={blog} key={blog.id} />
          ))}
      </section>
    </div>
  )
}