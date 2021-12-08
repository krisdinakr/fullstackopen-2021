import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createdNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const create = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    props.createAnecdote(content);
    props.createdNotification(content, 3000);
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

const connectedAnecdoteForm = connect(
  null,
  { createAnecdote, createdNotification }
)(AnecdoteForm)

export default connectedAnecdoteForm;
