import { BaseService } from '../services'

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case 'INITIALIZED_USERS':
      return action.data
    default:
      return state
  }
}

export const initializedUsers = () => {
  return async dispatch => {
    const users = await BaseService.get('/api/users')
    dispatch({
      type: 'INITIALIZED_USERS',
      data: users
    })
  }
}

export default usersReducer
