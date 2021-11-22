import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const FormLogin = ({ handlerLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()
    handlerLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={login}>
        <div>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

FormLogin.propTypes = {
  handlerLogin: PropTypes.func.isRequired
}