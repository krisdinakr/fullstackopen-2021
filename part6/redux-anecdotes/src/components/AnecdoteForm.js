import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createdNotification, resetNotification } from '../reducers/notificationReducer';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const create = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    dispatch(createAnecdote(anecdote));
    dispatch(createdNotification(anecdote));
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
