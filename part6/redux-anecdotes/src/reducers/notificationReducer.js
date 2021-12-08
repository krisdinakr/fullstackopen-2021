const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'VOTED':
      return `you voted '${action.data}'`
    case 'CREATED':
      return `you successfully added '${action.anecdote}'`
    case 'RESET':
      return null
    default:
      return state
  }
}

export const votedNotification = (data, timeout) => {
  return dispatch => {
    dispatch({
      type: 'VOTED',
      data
    })
    setTimeout(() => dispatch(resetNotification()), timeout)
  }
}

export const createdNotification = (anecdote, timeout) => {
  return dispatch => {
    dispatch({
      type: 'CREATED',
      anecdote
    })
    setTimeout(() => dispatch(resetNotification()), timeout)
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer;
