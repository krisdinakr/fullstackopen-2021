const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'RESET':
      return null
    default:
      return state
  }
}

const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

let timer = 0

export const setNotification = (message, variant) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        variant
      }
    })
    timer = setTimeout(() => dispatch(resetNotification()), 5_000)
  }
}

export default notificationReducer
