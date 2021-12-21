import { BaseService } from '../services'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZED_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      return state.map(blog => blog.id !== action.data.id ? blog : { ...blog, likes: action.data.likes })
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

export const initializedBlogs = (token) => {
  return async dispatch => {
    const blogs = await BaseService.get('/api/blogs', {}, token)
    dispatch({
      type: 'INITIALIZED_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (data, token) => {
  return async dispatch => {
    const newBlog = await BaseService.post('/api/blogs', data, token)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (data, token) => {
  return async dispatch => {
    const updatedBlog = await BaseService.patch(`/api/blogs/${data.id}`, { likes: data.likes + 1 }, token)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id, token) => {
  return async dispatch => {
    await BaseService.delete(`/api/blogs/${id}`, token)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export default blogReducer
