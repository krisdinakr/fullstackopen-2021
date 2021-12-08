import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createdNotification } from '../reducers/notificationReducer';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const create = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    dispatch(createAnecdote(content));
    dispatch(createdNotification(content, 3000));
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
