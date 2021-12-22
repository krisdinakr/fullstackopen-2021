import React from 'react'
import Container from '@mui/material/Container'
import { FormLogin } from '../components'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../reducers/userReducer'
import { useNavigate, Navigate } from 'react-router-dom'

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  const handlerLogin = async (data) => {
    try {
      await dispatch(loginAction(data))
      navigate('/')
    } catch (exception) {
      dispatch(setNotification(exception.message.error, 'error'))
    }
  }

  if (user) return <Navigate to="/" replace={true} />

  return (
    <Container>
      <FormLogin handlerLogin={handlerLogin} />
    </Container>
  )
}
