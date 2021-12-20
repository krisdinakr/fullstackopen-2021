import { BaseService } from '../services'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZED_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'LIKE':
      return state.map(blog => blog.id !== action.data.id ? blog : action.data)
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
    const blogObject = {
      title: data.title,
      author: data.author,
      url: data.url,
      likes: data.likes + 1,
    }
    const updatedBlog = await BaseService.put(`/api/blogs/${data.id}`, blogObject, token)
    console.log('here', updatedBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export default blogReducer
