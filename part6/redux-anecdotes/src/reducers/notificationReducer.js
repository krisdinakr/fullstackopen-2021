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

export const votedNotification = (data) => {
  return {
    type: 'VOTED',
    data
  }
}

export const createdNotification = (anecdote) => {
  return {
    type: 'CREATED',
    anecdote
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer;
