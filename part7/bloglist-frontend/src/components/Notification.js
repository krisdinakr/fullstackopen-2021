import React from 'react'
import PropTypes from 'prop-types'

export const Notification = ({ type, message }) => {
  if (!message) return null

  return (
    <div className={type === 'error' ? 'notification error' : 'notification'}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
}