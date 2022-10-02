import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    const filteredAnecdotes = state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().startsWith(state.filter.toLowerCase())
    );
    const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes);
    return sortedAnecdotes;
  });

  const vote = (id) => {
    dispatch(voteForAnecdote(id));
    const { content } = anecdotes.find((a) => a.id === id);
    dispatch(setNotification(`you voted for "${content}"`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 3500);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
