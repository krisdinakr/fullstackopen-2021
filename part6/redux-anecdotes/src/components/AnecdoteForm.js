import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createdNotification, resetNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const create = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const anecdote = await anecdoteService.create(content);
    dispatch(createAnecdote(anecdote));
    dispatch(createdNotification(content));
    setTimeout(() => dispatch(resetNotification()), 5000)
    e.target.anecdote.value = '';
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => create(e)}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdotesForm;
