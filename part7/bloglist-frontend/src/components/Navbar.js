import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../reducers/userReducer'

export const Navbar = ({ user }) => {
  const dispatch = useDispatch()

  const padding = {
    paddingLeft: 5,
    paddingRight: 5,
  }

  const handlerLogout = () => {
    window.localStorage.clear()
    dispatch(logoutAction())
  }

  return (
    <div className="navbar" style={{ background: 'gray', padding: 10 }}>
      <NavLink style={padding} to="/">blogs</NavLink>
      <NavLink style={padding} to="/users">users</NavLink>
      <span style={padding}>{user.name} logged-in</span>
      <button id="logout-button" onClick={handlerLogout}>logout</button>
    </div>
  )
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired
}