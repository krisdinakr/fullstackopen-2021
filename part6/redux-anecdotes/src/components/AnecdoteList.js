import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { votedNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const anecdoteList = anecdotes.sort((a, b) => b.votes - a.votes);
    return filter
      ? anecdoteList.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      : anecdoteList
  });

  const vote = ({ id, content }) => {
    dispatch(voteAnecdote(id))
    dispatch(votedNotification(content, 3000))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;
