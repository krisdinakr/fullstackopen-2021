import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const { id } = action.data;
      const anecdoteToChange = state.find(i => i.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.update(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const initializedAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer
