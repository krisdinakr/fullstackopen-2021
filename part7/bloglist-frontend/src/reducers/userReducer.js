import { BaseService } from '../services'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'INITIALIZED_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const loginAction = (data) => {
  return async dispatch => {
    const user = await BaseService.post('/api/login', data)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const initializedUser = (data) => {
  return async dispatch => {
    dispatch({
      type: 'INITIALIZED_USER',
      data
    })
  }
}

export const logoutAction = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer
