import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import Container from '@mui/material/Container'

export const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (!notification) return null

  return (
    <Container>
      <Alert
        severity={notification.variant === 'error' ? 'error' : 'success'}
      >
        {notification.message}
      </Alert>
    </Container>
  )
}
