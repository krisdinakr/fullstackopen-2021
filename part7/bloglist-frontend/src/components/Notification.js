import React from 'react'
import { useSelector } from 'react-redux'

export const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (!notification) return null

  return (
    <div className={notification.variant === 'error' ? 'notification error' : 'notification'}>
      {notification.message}
    </div>
  )
}
