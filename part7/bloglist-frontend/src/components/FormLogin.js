import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    padding: 20
  },
  box: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const FormLogin = ({ handlerLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()

  const login = (e) => {
    e.preventDefault()
    handlerLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Box className={classes.box}>
      <Paper
        elevation={3}
        className={classes.wrapper}
      >
        <Typography
          variant='h5'
          gutterBottom
          sx={{ fontWeight: 500 }}
        >
          Login
        </Typography>
        <form onSubmit={login}>
          <TextField
            label="username"
            variant="outlined"
            type="text"
            margin="normal"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            fullWidth
          />
          <TextField
            label="password"
            variant="outlined"
            type="password"
            margin="normal"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            fullWidth
          />
          <Button
            onClick={login}
            color="primary"
            variant="contained"
            sx={{ my: 2, width: '100%' }}
          >
            login
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

FormLogin.propTypes = {
  handlerLogin: PropTypes.func.isRequired
}