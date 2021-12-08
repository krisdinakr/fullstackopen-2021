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

let timer = 0

export const votedNotification = (data, timeout) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch({
      type: 'VOTED',
      data
    })
    timer = setTimeout(() => dispatch(resetNotification()), timeout)
  }
}

export const createdNotification = (anecdote, timeout) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch({
      type: 'CREATED',
      anecdote
    })
    timer = setTimeout(() => dispatch(resetNotification()), timeout)
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer;
