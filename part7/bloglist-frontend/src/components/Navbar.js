import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../reducers/userReducer'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
// import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
// import Menu from '@mui/material/Menu'
// import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
// import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
// import Tooltip from '@mui/material/Tooltip'
// import MenuItem from '@mui/material/MenuItem'

export const Navbar = ({ user }) => {
  const dispatch = useDispatch()

  const handlerLogout = () => {
    window.localStorage.clear()
    dispatch(logoutAction())
  }

  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit">
              <NavLink
                style={{ color: 'inherit', textDecoration: 'none' }}
                to="/"
              >
                blogs
              </NavLink>
            </Button>
            <Button color="inherit">
              <NavLink
                style={{ color: 'inherit', textDecoration: 'none' }}
                to="/users"
              >
                users
              </NavLink>
            </Button>
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Typography
                variant="button"
                component="div"
                sx={{ flexGrow: 1, my: 'auto' }}
              >
                {user.name} logged-in
              </Typography>
              <Button
                onClick={handlerLogout}
                color="inherit"
                variant="outlined"
                sx={{ ml: 2 }}
              >
                logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

Navbar.propTypes = {
  user: PropTypes.object
}